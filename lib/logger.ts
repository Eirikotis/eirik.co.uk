import "server-only";

type Details = Record<string, string | number | boolean | null | undefined>;

export function logServerError(event: string, error: unknown, details: Details = {}) {
  const safeError = error instanceof Error ? { name: error.name, message: error.message } : { name: "UnknownError", message: "Unknown server error" };
  console.error(JSON.stringify({ level: "error", event, ...safeError, ...details }));
}

export function logServerInfo(event: string, details: Details = {}) {
  console.info(JSON.stringify({ level: "info", event, ...details }));
}
