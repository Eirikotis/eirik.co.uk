import "server-only";

import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { LanguageModelProvider, ModelRequest, ModelUsage } from "@/lib/llm/provider";

type OpenRouterStreamingRequest =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming & {
    reasoning: { effort: "none"; exclude: true };
  };

export class OpenRouterProvider implements LanguageModelProvider {
  readonly name = "openrouter";
  readonly model: string;
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");

    this.model = process.env.OPENROUTER_MODEL || "qwen/qwen3-8b";
    this.client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://eirik.co.uk",
        "X-Title": "Eirik Otis",
      },
    });
  }

  async *streamAnswer({ messages, profile, evidence, olderContextSummary }: ModelRequest) {
    const evidenceContext = evidence.length
      ? evidence.map((item) => `<evidence name="${item.key}">\n${item.content}\n</evidence>`).join("\n\n")
      : "No detailed evidence was retrieved for this broad question. Answer from the compact profile and state uncertainty where necessary.";

    const request: OpenRouterStreamingRequest = {
      model: this.model,
      messages: [
        { role: "system", content: getSystemPrompt() },
        { role: "system", content: `<core_profile>\n${profile}\n</core_profile>` },
        { role: "system", content: `<retrieved_evidence>\n${evidenceContext}\n</retrieved_evidence>` },
        ...(olderContextSummary ? [{ role: "system" as const, content: `<earlier_topics>\n${olderContextSummary}\n</earlier_topics>` }] : []),
        ...messages,
      ],
      max_tokens: 900,
      temperature: 0.35,
      reasoning: { effort: "none", exclude: true },
      stream: true,
    };
    const stream = await this.client.chat.completions.create(request);
    let generationId: string | undefined;

    for await (const chunk of stream) {
      generationId ||= chunk.id;
      const delta = chunk.choices[0]?.delta.content;
      if (delta) yield { type: "text" as const, delta };

      const rawUsage = (chunk as unknown as { usage?: RawOpenRouterUsage }).usage;
      if (rawUsage) {
        const usage: ModelUsage = {
          generationId,
          inputTokens: rawUsage.prompt_tokens,
          outputTokens: rawUsage.completion_tokens,
          totalTokens: rawUsage.total_tokens,
          costCredits: rawUsage.cost,
          cachedTokens: rawUsage.prompt_tokens_details?.cached_tokens,
          cacheWriteTokens: rawUsage.prompt_tokens_details?.cache_write_tokens,
          upstreamInferenceCost: rawUsage.cost_details?.upstream_inference_cost,
        };
        yield { type: "usage" as const, usage };
      }
    }
  }
}

type RawOpenRouterUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  cost?: number;
  prompt_tokens_details?: {
    cached_tokens?: number;
    cache_write_tokens?: number;
  };
  cost_details?: {
    upstream_inference_cost?: number;
  };
};

export function createLanguageModelProvider(): LanguageModelProvider {
  return new OpenRouterProvider();
}
