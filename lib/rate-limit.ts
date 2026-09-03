import "server-only";

import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { incrementRateLimit } from "@/lib/db";

const WINDOW_MS = 60 * 60 * 1_000;
const DEFAULT_LIMIT = 20;

function privacyPreservingKey(request: NextRequest, sessionId: string) {
  const salt = process.env.RATE_LIMIT_SALT || (process.env.NODE_ENV === "production" ? "" : "local-development-only");
  if (!salt) throw new Error("RATE_LIMIT_SALT is not configured");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return createHmac("sha256", salt).update(`${forwarded}|${userAgent}|${sessionId}`).digest("hex");
}

export async function enforceRateLimit(request: NextRequest, sessionId: string) {
  const limit = Number(process.env.RATE_LIMIT_PER_HOUR || DEFAULT_LIMIT);
  const now = Date.now();
  const windowStart = new Date(Math.floor(now / WINDOW_MS) * WINDOW_MS);
  const count = await incrementRateLimit(privacyPreservingKey(request, sessionId), windowStart);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count), retryAfterSeconds: Math.ceil((windowStart.getTime() + WINDOW_MS - now) / 1_000) };
}
