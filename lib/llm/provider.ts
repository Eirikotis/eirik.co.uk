import "server-only";

export type ModelMessage = { role: "user" | "assistant"; content: string };

export interface LanguageModelProvider {
  readonly model: string;
  streamAnswer(messages: ModelMessage[]): AsyncIterable<string>;
}
