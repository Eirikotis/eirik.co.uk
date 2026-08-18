import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { selectEvidenceKeys, type EvidenceKey } from "@/lib/evidence-router";

const base = join(process.cwd(), "content", "eirik");
const files: Record<EvidenceKey, string> = {
  career: "career.md",
  bittensor: "bittensor.md",
  kpmg: "kpmg.md",
  oneClickLabs: "one-click-labs.md",
  gartner: "gartner.md",
  dusd: "dusd.md",
  technical: "technical.md",
  commercial: "commercial.md",
  education: "education.md",
  roleFit: "role-fit.md",
  workSystems: "work-systems.md",
  financialSystems: "financial-systems.md",
  claimBoundaries: "claim-boundaries.md",
};

const cache = new Map<string, string>();

function load(name: string) {
  const existing = cache.get(name);
  if (existing) return existing;
  const content = readFileSync(join(base, name), "utf8").trim();
  cache.set(name, content);
  return content;
}

export function getCoreProfile() {
  return load("profile.md");
}

export function getEvidence(question: string, recentUserQuestions: string[]) {
  const keys = selectEvidenceKeys(question, recentUserQuestions);
  return keys.map((key) => ({ key, content: load(files[key]) }));
}

export function getContextMetrics(question: string, recentUserQuestions: string[] = []) {
  const profile = getCoreProfile();
  const evidence = getEvidence(question, recentUserQuestions);
  const characters = profile.length + evidence.reduce((sum, item) => sum + item.content.length, 0);
  return {
    profileCharacters: profile.length,
    evidenceKeys: evidence.map((item) => item.key),
    evidenceCharacters: characters - profile.length,
    characters,
    estimatedTokens: Math.ceil(characters / 4),
  };
}
