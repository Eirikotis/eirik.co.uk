import "server-only";

export type ModelMessage = { role: "user" | "assistant"; content: string };

export type RetrievedEvidence = { key: string; content: string };

export type ModelRequest = {
  messages: ModelMessage[];
  profile: string;
  evidence: RetrievedEvidence[];
  olderContextSummary?: string;
};

export type ModelUsage = {
  generationId?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  costCredits?: number;
  cachedTokens?: number;
  cacheWriteTokens?: number;
  upstreamInferenceCost?: number;
};

export type ModelStreamEvent =
  | { type: "text"; delta: string }
  | { type: "usage"; usage: ModelUsage };

export interface LanguageModelProvider {
  readonly model: string;
  readonly name: string;
  streamAnswer(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
}
