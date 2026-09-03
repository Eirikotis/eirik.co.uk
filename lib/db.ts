import "server-only";

import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool, type PoolClient } from "pg";

export type StoredMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  model: string | null;
  provider: string | null;
  status: "complete" | "error";
  errorCode: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
  costCredits: number | null;
  cachedTokens: number | null;
  cacheWriteTokens: number | null;
  upstreamInferenceCost: number | null;
  generationId: string | null;
  evidenceKeys: string[];
  contextCharacters: number | null;
  historyMessages: number | null;
  createdAt: string;
};

export type ConversationSummary = {
  id: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  preview: string;
  inputTokens: number;
  outputTokens: number;
  costCredits: number;
};

declare global {
  var eirikDbPool: Pool | undefined;
  var eirikSchemaReady: Promise<void> | undefined;
}

function connectionConfig() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");

  const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
  const useSsl = process.env.DATABASE_SSL === "true" || (!isLocal && process.env.DATABASE_SSL !== "false");
  return {
    connectionString,
    max: Number(process.env.DATABASE_POOL_SIZE || 5),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    ssl: useSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false" } : undefined,
  };
}

export function getPool() {
  if (!global.eirikDbPool) global.eirikDbPool = new Pool(connectionConfig());
  return global.eirikDbPool;
}

export function ensureSchema() {
  if (!global.eirikSchemaReady) {
    const schema = readFileSync(join(process.cwd(), "db", "schema.sql"), "utf8");
    global.eirikSchemaReady = getPool().query(schema).then(() => undefined).catch((error) => {
      global.eirikSchemaReady = undefined;
      throw error;
    });
  }
  return global.eirikSchemaReady;
}

export async function getOrCreateConversation(sessionId: string, conversationId?: string) {
  await ensureSchema();
  const pool = getPool();

  if (conversationId) {
    const existing = await pool.query<{ id: string }>(
      "SELECT id FROM conversations WHERE id = $1 AND anonymous_session_id = $2",
      [conversationId, sessionId],
    );
    if (existing.rowCount) return existing.rows[0].id;
  }

  const id = randomUUID();
  await pool.query("INSERT INTO conversations (id, anonymous_session_id) VALUES ($1, $2)", [id, sessionId]);
  return id;
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  options: {
    model?: string;
    provider?: string;
    status?: "complete" | "error";
    errorCode?: string;
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    costCredits?: number;
    cachedTokens?: number;
    cacheWriteTokens?: number;
    upstreamInferenceCost?: number;
    generationId?: string;
    evidenceKeys?: string[];
    contextCharacters?: number;
    historyMessages?: number;
  } = {},
) {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO messages (
         id, conversation_id, role, content, model, provider, status, error_code,
         input_tokens, output_tokens, total_tokens, cost_credits, cached_tokens,
         cache_write_tokens, upstream_inference_cost, generation_id, evidence_keys,
         context_characters, history_messages
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
         $15, $16, $17, $18, $19
       )`,
      [
        randomUUID(), conversationId, role, content, options.model || null,
        options.provider || null, options.status || "complete", options.errorCode || null,
        options.inputTokens ?? null, options.outputTokens ?? null, options.totalTokens ?? null,
        options.costCredits ?? null, options.cachedTokens ?? null, options.cacheWriteTokens ?? null,
        options.upstreamInferenceCost ?? null, options.generationId || null,
        options.evidenceKeys || [], options.contextCharacters ?? null, options.historyMessages ?? null,
      ],
    );
    await client.query("UPDATE conversations SET updated_at = now() WHERE id = $1", [conversationId]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

function mapMessage(row: Record<string, unknown>): StoredMessage {
  return {
    id: String(row.id),
    role: row.role as "user" | "assistant",
    content: String(row.content),
    model: row.model ? String(row.model) : null,
    provider: row.provider ? String(row.provider) : null,
    status: row.status as "complete" | "error",
    errorCode: row.error_code ? String(row.error_code) : null,
    inputTokens: row.input_tokens === null || row.input_tokens === undefined ? null : Number(row.input_tokens),
    outputTokens: row.output_tokens === null || row.output_tokens === undefined ? null : Number(row.output_tokens),
    totalTokens: row.total_tokens === null || row.total_tokens === undefined ? null : Number(row.total_tokens),
    costCredits: row.cost_credits === null || row.cost_credits === undefined ? null : Number(row.cost_credits),
    cachedTokens: row.cached_tokens === null || row.cached_tokens === undefined ? null : Number(row.cached_tokens),
    cacheWriteTokens: row.cache_write_tokens === null || row.cache_write_tokens === undefined ? null : Number(row.cache_write_tokens),
    upstreamInferenceCost: row.upstream_inference_cost === null || row.upstream_inference_cost === undefined ? null : Number(row.upstream_inference_cost),
    generationId: row.generation_id ? String(row.generation_id) : null,
    evidenceKeys: Array.isArray(row.evidence_keys) ? row.evidence_keys.map(String) : [],
    contextCharacters: row.context_characters === null || row.context_characters === undefined ? null : Number(row.context_characters),
    historyMessages: row.history_messages === null || row.history_messages === undefined ? null : Number(row.history_messages),
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

export async function getConversation(sessionId: string, conversationId: string, limit = 100) {
  await ensureSchema();
  const result = await getPool().query(
    `SELECT m.* FROM messages m
     INNER JOIN conversations c ON c.id = m.conversation_id
     WHERE c.id = $1 AND c.anonymous_session_id = $2
     ORDER BY m.created_at ASC LIMIT $3`,
    [conversationId, sessionId, limit],
  );
  return result.rows.map(mapMessage);
}

export async function getRecentConversationMessages(conversationId: string, limit: number) {
  await ensureSchema();
  const result = await getPool().query(
    `SELECT * FROM (
       SELECT * FROM messages WHERE conversation_id = $1 AND status = 'complete'
       ORDER BY created_at DESC LIMIT $2
     ) recent ORDER BY created_at ASC`,
    [conversationId, limit],
  );
  return result.rows.map(mapMessage);
}

export async function getModelConversationContext(conversationId: string, recentLimit: number) {
  const messages = await getRecentConversationMessages(conversationId, recentLimit);
  if (messages.length < recentLimit) return { messages, olderContextSummary: undefined };

  const oldestRecent = messages[0]?.createdAt;
  if (!oldestRecent) return { messages, olderContextSummary: undefined };
  const older = await getPool().query<{ content: string }>(
    `SELECT content FROM messages
     WHERE conversation_id = $1 AND role = 'user' AND status = 'complete' AND created_at < $2
     ORDER BY created_at DESC LIMIT 6`,
    [conversationId, oldestRecent],
  );
  if (!older.rowCount) return { messages, olderContextSummary: undefined };

  const topics = older.rows
    .reverse()
    .map((row) => row.content.replace(/\s+/g, " ").trim().slice(0, 180))
    .filter(Boolean);
  return {
    messages,
    olderContextSummary: `Earlier visitor questions, supplied only to preserve conversational continuity: ${topics.join(" | ")}`,
  };
}

export async function listConversations(search = "", limit = 100): Promise<ConversationSummary[]> {
  await ensureSchema();
  const query = search.trim();
  const result = await getPool().query(
    `SELECT c.id, c.created_at, c.updated_at, COUNT(m.id)::int AS message_count,
      COALESCE(SUM(m.input_tokens), 0)::int AS input_tokens,
      COALESCE(SUM(m.output_tokens), 0)::int AS output_tokens,
      COALESCE(SUM(m.cost_credits), 0)::text AS cost_credits,
      COALESCE((SELECT content FROM messages latest WHERE latest.conversation_id = c.id ORDER BY created_at DESC LIMIT 1), '') AS preview
     FROM conversations c
     LEFT JOIN messages m ON m.conversation_id = c.id
     WHERE ($1 = '' OR EXISTS (SELECT 1 FROM messages searched WHERE searched.conversation_id = c.id AND searched.content ILIKE '%' || $1 || '%'))
     GROUP BY c.id
     ORDER BY c.updated_at DESC LIMIT $2`,
    [query, limit],
  );
  return result.rows.map((row) => ({
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    messageCount: row.message_count,
    preview: row.preview,
    inputTokens: Number(row.input_tokens),
    outputTokens: Number(row.output_tokens),
    costCredits: Number(row.cost_credits),
  }));
}

export async function getAdminConversation(conversationId: string) {
  await ensureSchema();
  const conversation = await getPool().query("SELECT * FROM conversations WHERE id = $1", [conversationId]);
  if (!conversation.rowCount) return null;
  const messages = await getPool().query("SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC", [conversationId]);
  return {
    id: conversation.rows[0].id as string,
    createdAt: new Date(conversation.rows[0].created_at).toISOString(),
    updatedAt: new Date(conversation.rows[0].updated_at).toISOString(),
    messages: messages.rows.map(mapMessage),
  };
}

export async function incrementRateLimit(bucketKey: string, windowStart: Date) {
  await ensureSchema();
  const result = await getPool().query<{ request_count: number }>(
    `INSERT INTO rate_limits (bucket_key, window_start, request_count) VALUES ($1, $2, 1)
     ON CONFLICT (bucket_key, window_start) DO UPDATE SET request_count = rate_limits.request_count + 1
     RETURNING request_count`,
    [bucketKey, windowStart],
  );
  if (Math.random() < 0.01) void getPool().query("DELETE FROM rate_limits WHERE window_start < now() - interval '7 days'").catch(() => undefined);
  return result.rows[0].request_count;
}

export async function withTransaction<T>(work: (client: PoolClient) => Promise<T>) {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
