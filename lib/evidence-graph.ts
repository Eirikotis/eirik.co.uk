import { readFileSync } from "node:fs";
import { join } from "node:path";

type EvidenceAtom = {
  id: string;
  label: string;
  period: string;
  kind: string;
  group: string;
  strength: number;
  capabilities: string[];
  situation: string;
  contribution: string;
  outcome: string;
  boundary: string;
};

const capabilityPatterns: Array<{ capability: string; pattern: RegExp }> = [
  { capability: "data quality", pattern: /messy data|dirty data|data quality|clean(?:ing|ed)?|normali[sz]|fragmented data|inconsistent (?:data|formats?)|incomplete (?:data|history|historical)/i },
  { capability: "building", pattern: /what (?:has|did) (?:he|eirik) (?:actually )?(?:build|built|make|made|create|created)|built real products?|can (?:he|eirik) (?:actually )?(?:build|code)|software|programming|technical(?:ly)? complex/i },
  { capability: "data systems", pattern: /data systems?|data infrastructure|pipelines?|ingestion|canonicali[sz]|database/i },
  { capability: "financial systems", pattern: /financial products?|financial systems?|finance|lending|credit|portfolio|accounting|investment/i },
  { capability: "product ownership", pattern: /product|ownership|roadmap|requirements|delivery|project management/i },
  { capability: "machine learning", pattern: /machine learning|\bml\b/i },
  { capability: "ai", pattern: /\bai\b|artificial intelligence|llm|inference|compute/i },
  { capability: "commercial judgement", pattern: /commercial|partnership|business development|go-to-market|\bgtm\b|sales|investor/i },
  { capability: "autonomy", pattern: /autonomy|independent|self-directed|initiative/i },
  { capability: "collaboration", pattern: /collaboration|teamwork|stakeholder|client|cross-functional|manage(?:d|ment)? team/i },
  { capability: "operations", pattern: /operations?|process|monitoring|deployment|implementation/i },
  { capability: "regulated finance", pattern: /traditional finance|regulated|assurance|audit|controls?|aca|kpmg/i },
];

const defaultsByCapability: Record<string, string[]> = {
  "data quality": ["e2-finance", "opportunity-engine", "bittensor-autoresearch", "one-click-labs"],
  building: ["e2-finance", "opportunity-engine", "bittensor-credit", "bittensor-autoresearch", "dusd-markets"],
  "data systems": ["e2-finance", "opportunity-engine", "bittensor-autoresearch", "one-click-labs"],
  "financial systems": ["e2-finance", "bittensor-credit", "kpmg", "one-click-labs", "finance-foundation"],
  "product ownership": ["bittensor-credit", "e2-finance", "opportunity-engine", "dusd-markets", "one-click-labs"],
  "machine learning": ["bittensor-autoresearch"],
  ai: ["opportunity-engine", "eirik-ai-interface", "bittensor-autoresearch", "bittensor-compute"],
  "commercial judgement": ["bittensor-credit", "bittensor-compute", "kpmg", "one-click-labs", "gartner"],
  autonomy: ["e2-finance", "opportunity-engine", "dusd-markets", "bittensor-autoresearch"],
  collaboration: ["bittensor-credit", "kpmg", "one-click-labs", "bittensor-compute"],
  operations: ["opportunity-engine", "dusd-markets", "kpmg", "dusd-analytics"],
  "regulated finance": ["kpmg", "finance-foundation", "e2-finance", "bittensor-credit"],
};

const generalOrder = ["e2-finance", "opportunity-engine", "bittensor-credit", "kpmg", "bittensor-autoresearch", "one-click-labs"];

let cache: EvidenceAtom[] | undefined;

function allAtoms(): EvidenceAtom[] {
  if (cache) return cache;
  const path = join(process.cwd(), "content", "eirik", "public-evidence.json");
  cache = JSON.parse(readFileSync(path, "utf8")) as EvidenceAtom[];
  return cache;
}

function requestedCapabilities(question: string) {
  return capabilityPatterns.filter(({ pattern }) => pattern.test(question)).map(({ capability }) => capability);
}

function preferredIds(question: string, capabilities: string[]) {
  const explicit: string[] = [];
  if (/outside (?:of )?(?:crypto|web3|defi)|non[- ]crypto/i.test(question)) explicit.push("opportunity-engine", "eirik-ai-interface", "kpmg");
  if (/e2 finance|e2\.finance/i.test(question)) explicit.push("e2-finance");
  if (/opportunit(?:y|ies) (?:engine|radar)/i.test(question)) explicit.push("opportunity-engine");
  if (/eirik(?:\.co\.uk)? ai|ai interface|website assistant/i.test(question)) explicit.push("eirik-ai-interface");
  if (/bittensor|morpho|credit protocol|collateral|liquidation|oracle/i.test(question)) explicit.push("bittensor-credit", "bittensor-autoresearch", "bittensor-compute");
  if (/machine learning|\bml\b/i.test(question)) explicit.unshift("bittensor-autoresearch");
  if (/auto[- ]?research|quantitative research|walk[- ]forward|backtest/i.test(question)) explicit.unshift("bittensor-autoresearch");
  if (/compute|inference/i.test(question)) explicit.unshift("bittensor-compute");
  if (/dusd markets?|launchpad|settlement/i.test(question)) explicit.push("dusd-markets");
  if (/dusd(?:\.fun)?|burn automation/i.test(question)) explicit.push("dusd-analytics");
  if (/\bkpmg\b|assurance|audit|reconciliation/i.test(question)) explicit.push("kpmg");
  if (/one click labs?|defillama|portfolio optimi[sz]ation/i.test(question)) explicit.push("one-click-labs");
  if (/gartner/i.test(question)) explicit.push("gartner");
  if (/warwick|\baca\b|accounting and finance|traditional finance/i.test(question)) explicit.push("finance-foundation");

  return [...explicit, ...capabilities.flatMap((capability) => defaultsByCapability[capability] ?? []), ...generalOrder];
}

function selectEvidenceAtoms(question: string, recentUserQuestions: string[] = []) {
  const contextQuestion = [recentUserQuestions.at(-1), question].filter(Boolean).join("\n");
  const capabilities = requestedCapabilities(contextQuestion);
  const atoms = allAtoms();
  const byId = new Map(atoms.map((atom) => [atom.id, atom]));
  let ordered = preferredIds(contextQuestion, capabilities);
  const asksForOtherExamples = /(?:one|single|old job).{0,60}(?:elsewhere|other|more)|shown (?:that|it) elsewhere|other examples?/i.test(question);
  if (asksForOtherExamples && capabilities.length) {
    const primaryOrder = defaultsByCapability[capabilities[0]] ?? [];
    if (primaryOrder.length > 1) {
      const alternatives = ordered.filter((id) => id !== primaryOrder[0]);
      const recentAlternatives = alternatives.filter((id) => byId.get(id)?.period.includes("2026"));
      ordered = [...recentAlternatives, ...alternatives.filter((id) => !recentAlternatives.includes(id))];
    }
  }
  const selected: EvidenceAtom[] = [];
  const groupCounts = new Map<string, number>();
  const explicitlyAboutBittensor = /bittensor|morpho|auto[- ]?research|compute|inference/i.test(contextQuestion);
  const outsideCrypto = /outside (?:of )?(?:crypto|web3|defi)|non[- ]crypto/i.test(contextQuestion);
  const cryptoGroups = new Set(["e2", "bittensor", "dusd", "one-click-labs"]);

  for (const id of ordered) {
    const atom = byId.get(id);
    if (!atom || selected.some((item) => item.id === id)) continue;
    if (outsideCrypto && cryptoGroups.has(atom.group)) continue;
    const groupLimit = atom.group === "bittensor" && explicitlyAboutBittensor ? 3 : 1;
    if ((groupCounts.get(atom.group) ?? 0) >= groupLimit) continue;
    if (capabilities.length && !atom.capabilities.some((capability) => capabilities.includes(capability))) continue;
    selected.push(atom);
    groupCounts.set(atom.group, (groupCounts.get(atom.group) ?? 0) + 1);
    if (selected.length === (asksForOtherExamples ? 3 : 4)) break;
  }

  return { capabilities, selected };
}

export function getCapabilityEvidence(question: string, recentUserQuestions: string[] = []) {
  const { capabilities, selected } = selectEvidenceAtoms(question, recentUserQuestions);

  const focus = capabilities.length ? capabilities.join(", ") : "Eirik's current direction and recurring strengths";
  const evidence = selected.map((atom) => [
    `## ${atom.label} | ${atom.period} | ${atom.kind}`,
    `Capabilities: ${atom.capabilities.join(", ")}.`,
    `Situation: ${atom.situation}`,
    `Eirik's contribution: ${atom.contribution}`,
    `Outcome: ${atom.outcome}`,
    `Boundary: ${atom.boundary}`,
  ].join("\n")).join("\n\n");

  return `# Cross-context capability evidence\n\nQuestion focus: ${focus}.\n\nUse this as a set of evidence, not a list to recite. Explain the recurring capability or judgement first. The items are ordered by intended relevance and recency. For a broad capability question, normally support it with two or three different contexts and keep each example brief. If the visitor asks for the best example, use the first supplied item as the primary example unless the question explicitly names another domain, then add one short corroborating sentence showing whether the pattern appears elsewhere. If a follow-up asks whether the capability appears elsewhere, move to the next recent supplied examples rather than defaulting to the oldest employer. Do not let one employer or project become the entire answer. Do not mention every item supplied.\n\nUse only the situations, sources, actions and outcomes actually stated below. Do not widen them with plausible but unstated exchanges, networks, feeds, clients, technologies, data defects or methods. Preserve every stated date and the exact meaning of metrics: a database containing records does not mean the system processed that quantity during the period, and 8 September must not become August or an approximate date.\n\nRefer to credit-protocol, quantitative-research, compute and inference work collectively as Eirik's professional work in the Bittensor ecosystem. Do not lead with the internal venture name VOID; mention that name only when the visitor asks about it or it prevents ambiguity.\n\n${evidence}`;
}

export function getEvidenceAtomIds(question: string, recentUserQuestions: string[] = []) {
  return selectEvidenceAtoms(question, recentUserQuestions).selected.map((atom) => atom.id);
}
