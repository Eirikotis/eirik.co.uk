import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

const DOCUMENTS = [
  "core.md",
  "career.md",
  "bittensor.md",
  "kpmg.md",
  "one-click-labs.md",
  "dusd.md",
  "technical.md",
  "commercial.md",
  "education.md",
  "claim-boundaries.md",
] as const;

let cachedContext: string | undefined;

export function getProfessionalContext() {
  if (cachedContext) return cachedContext;

  const base = join(process.cwd(), "content", "eirik");
  cachedContext = DOCUMENTS.map((name) => {
    const content = readFileSync(join(base, name), "utf8").trim();
    return `--- ${name} ---\n${content}`;
  }).join("\n\n");

  return cachedContext;
}

export function getContextMetrics() {
  const context = getProfessionalContext();
  return {
    documents: DOCUMENTS.length,
    characters: context.length,
    estimatedTokens: Math.ceil(context.length / 4),
  };
}
