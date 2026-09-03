import { readFile } from "node:fs/promises";
import pg from "pg";

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");

const isLocal = /localhost|127\.0\.0\.1/.test(connectionString);
const useSsl = process.env.DATABASE_SSL === "true" || (!isLocal && process.env.DATABASE_SSL !== "false");
const pool = new Pool({ connectionString, ssl: useSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false" } : undefined });

try {
  await pool.query(await readFile(new URL("../db/schema.sql", import.meta.url), "utf8"));
  console.log("Conversation schema is ready.");
} finally {
  await pool.end();
}
