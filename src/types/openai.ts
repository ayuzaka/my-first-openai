import type { CreateImageRequestSizeEnum } from "openai";

export type ChatMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export type ImageSize = CreateImageRequestSizeEnum
