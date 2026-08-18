export const MAX_INPUT_LENGTH = 1_000;
export const MAX_HISTORY_MESSAGES = 10;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function validateMessage(value: unknown) {
  if (typeof value !== "string") return { ok: false as const, error: "Please enter a question." };
  const message = value.trim();
  if (!message) return { ok: false as const, error: "Please enter a question." };
  if (message.length > MAX_INPUT_LENGTH) return { ok: false as const, error: `Questions are limited to ${MAX_INPUT_LENGTH.toLocaleString()} characters.` };
  return { ok: true as const, message };
}

const EXTRACTION_PATTERNS = [
  /(?:show|reveal|print|repeat|dump|quote).{0,40}(?:system|hidden|developer) prompt/i,
  /(?:show|reveal|print|dump|quote).{0,40}(?:raw|hidden|full).{0,20}(?:context|background file|knowledge)/i,
  /ignore.{0,30}(?:previous|prior|system|developer) instructions/i,
  /(?:show|reveal|list|print).{0,30}(?:environment variables|api key|secret|filesystem path)/i,
];

export function requestsProtectedMaterial(message: string) {
  return EXTRACTION_PATTERNS.some((pattern) => pattern.test(message));
}
