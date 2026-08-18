import "server-only";

import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/system-prompt";
import type { LanguageModelProvider, ModelMessage } from "@/lib/llm/provider";

export class OpenAIProvider implements LanguageModelProvider {
  readonly model: string;
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

    this.model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
    this.client = new OpenAI({ apiKey });
  }

  async *streamAnswer(messages: ModelMessage[]) {
    const stream = await this.client.responses.create({
      model: this.model,
      instructions: getSystemPrompt(),
      input: messages,
      max_output_tokens: 900,
      store: false,
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") yield event.delta;
      if (event.type === "error") throw new Error(event.message || "The model stream failed");
    }
  }
}

export function createLanguageModelProvider(): LanguageModelProvider {
  return new OpenAIProvider();
}
