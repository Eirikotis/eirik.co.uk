import "server-only";

import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { LanguageModelProvider, ModelMessage } from "@/lib/llm/provider";

type OpenRouterStreamingRequest =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming & {
    reasoning: { effort: "none"; exclude: true };
  };

export class OpenRouterProvider implements LanguageModelProvider {
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

  async *streamAnswer(messages: ModelMessage[]) {
    const request: OpenRouterStreamingRequest = {
      model: this.model,
      messages: [
        { role: "system", content: getSystemPrompt() },
        ...messages,
      ],
      max_tokens: 900,
      temperature: 0.35,
      reasoning: { effort: "none", exclude: true },
      stream: true,
    };
    const stream = await this.client.chat.completions.create(request);

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta.content;
      if (delta) yield delta;
    }
  }
}

export function createLanguageModelProvider(): LanguageModelProvider {
  return new OpenRouterProvider();
}
