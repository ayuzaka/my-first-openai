import { OpenAIApi, Configuration } from "openai";

import type { ImageSize } from "@/types/openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

type Res = {
  prompt: string;
  size: ImageSize
};

export async function POST(request: Request) {
  const { prompt, size }: Res = await request.json();

  const response = await openAI.createImage({
    prompt,
    n: 1,
    size,
    response_format: "url",
  })

  const images = response.data.data.map((image) => image.url).filter(Boolean)

  return new Response(JSON.stringify({ images }), {
    status: 200,
  });
}
