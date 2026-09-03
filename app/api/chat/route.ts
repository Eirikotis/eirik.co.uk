import { NextRequest } from "next/server";
import { createLanguageModelProvider } from "@/lib/llm/openrouter";
import { getModelConversationContext, getOrCreateConversation, saveMessage } from "@/lib/db";
import { getCoreProfile, getEvidence } from "@/lib/knowledge";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { ModelUsage } from "@/lib/llm/provider";
import { logServerError, logServerInfo } from "@/lib/logger";
import { enforceRateLimit } from "@/lib/rate-limit";
import { normalizeQuestionForModel } from "@/lib/evidence-router";
import { isUuid, MAX_HISTORY_MESSAGES, requestsProtectedMaterial, validateMessage } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

function jsonError(message: string, status: number, headers: HeadersInit = {}) {
  return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function event(type: string, payload: Record<string, unknown> = {}) {
  return encoder.encode(`data: ${JSON.stringify({ type, ...payload })}\n\n`);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    logServerInfo("chat_malformed_request");
    return jsonError("That request could not be read.", 400);
  }

  const validated = validateMessage(body.message);
  if (!validated.ok) return jsonError(validated.error, 400);
  if (!isUuid(body.sessionId)) return jsonError("Your browser session is invalid. Start a new conversation and try again.", 400);
  if (body.conversationId !== undefined && body.conversationId !== null && !isUuid(body.conversationId)) {
    return jsonError("The conversation identifier is invalid.", 400);
  }

  const sessionId = body.sessionId;
  const requestedConversationId = typeof body.conversationId === "string" ? body.conversationId : undefined;

  let conversationId: string;
  try {
    const rate = await enforceRateLimit(request, sessionId);
    if (!rate.allowed) {
      return jsonError("Too many questions have been sent from this browser. Please try again later.", 429, {
        "Retry-After": String(rate.retryAfterSeconds),
      });
    }
    conversationId = await getOrCreateConversation(sessionId, requestedConversationId);
    await saveMessage(conversationId, "user", validated.message);
  } catch (error) {
    logServerError("chat_storage_initialisation_failed", error);
    return jsonError("The conversation service is temporarily unavailable. Please try again shortly.", 503);
  }

  if (requestsProtectedMaterial(validated.message)) {
    const refusal = "I can answer questions about Eirik's professional background, but I can't reveal hidden instructions, raw context, credentials or internal implementation details.";
    try {
      await saveMessage(conversationId, "assistant", refusal);
    } catch (error) {
      logServerError("chat_refusal_storage_failed", error, { conversationId });
    }
    return new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(event("conversation", { conversationId }));
        controller.enqueue(event("delta", { delta: refusal }));
        controller.enqueue(event("done"));
        controller.close();
      },
    }), { headers: streamHeaders() });
  }

  let provider;
  let history;
  let profile;
  let evidence;
  try {
    provider = createLanguageModelProvider();
    history = await getModelConversationContext(conversationId, MAX_HISTORY_MESSAGES);
    profile = getCoreProfile();
    const recentUserQuestions = history.messages
      .filter((message) => message.role === "user")
      .map((message) => message.content);
    evidence = getEvidence(validated.message, recentUserQuestions.slice(0, -1));
  } catch (error) {
    logServerError("chat_provider_unavailable", error, { conversationId });
    const fallback = "The assistant is temporarily unavailable. Your question has been saved; please try again shortly.";
    try {
      await saveMessage(conversationId, "assistant", fallback, { status: "error", errorCode: "provider_unavailable" });
    } catch (storageError) {
      logServerError("chat_provider_error_storage_failed", storageError, { conversationId });
    }
    return jsonError(fallback, 503);
  }

  const model = provider.model;
  const messages = history.messages.map(({ role, content }, index) => ({
    role,
    content: role === "user" && index === history.messages.length - 1
      ? normalizeQuestionForModel(content)
      : content,
  }));
  const evidenceKeys = evidence.map((item) => item.key);
  const contextCharacters = getSystemPrompt().length + profile.length +
    evidence.reduce((sum, item) => sum + item.content.length, 0) +
    messages.reduce((sum, message) => sum + message.content.length, 0) +
    (history.olderContextSummary?.length || 0);
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      let usage: ModelUsage = {};
      controller.enqueue(event("conversation", { conversationId }));
      try {
        for await (const item of provider.streamAnswer({
          messages,
          profile,
          evidence,
          olderContextSummary: history.olderContextSummary,
        })) {
          if (item.type === "usage") {
            usage = item.usage;
            continue;
          }
          answer += item.delta;
          controller.enqueue(event("delta", { delta: item.delta }));
        }
        if (!answer.trim()) throw new Error("The model returned an empty response");
        await saveMessage(conversationId, "assistant", answer, {
          model,
          provider: provider.name,
          ...usage,
          evidenceKeys,
          contextCharacters,
          historyMessages: messages.length,
        });
        controller.enqueue(event("done"));
      } catch (error) {
        logServerError("chat_stream_failed", error, { conversationId, model, partial: Boolean(answer) });
        const safeMessage = answer || "I couldn't complete that answer. Please try again.";
        try {
          await saveMessage(conversationId, "assistant", safeMessage, {
            model,
            provider: provider.name,
            status: "error",
            errorCode: "stream_failed",
            ...usage,
            evidenceKeys,
            contextCharacters,
            historyMessages: messages.length,
          });
        } catch (storageError) {
          logServerError("chat_stream_error_storage_failed", storageError, { conversationId });
        }
        controller.enqueue(event("error", { message: answer ? "The answer was interrupted." : safeMessage }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: streamHeaders() });
}

function streamHeaders() {
  return {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-store, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
}
