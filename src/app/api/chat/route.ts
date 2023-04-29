import { Configuration, OpenAIApi } from "openai";

import type { ChatMessage } from "@/types/openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

const systemMessage = [
  { role: "system", content: "You are a helpful assistant." },
] satisfies ChatMessage[];

export async function POST(request: Request) {
  const res: ChatMessage [] = await request.json();

  const response = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...systemMessage, ...res],
  });

  const message = response.data.choices[0].message?.content;

  return new Response(JSON.stringify({ message }), {
    status: 200,
  });
}
