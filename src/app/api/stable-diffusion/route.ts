import { convertBlobToImage } from "@/utils";
import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = body.prompt;
  const blob = await inference.textToImage({
    model: "stabilityai/stable-diffusion-2",
    inputs: prompt,
    parameters: {
      negative_prompt: "blurry",
    },
  });

  const image = await convertBlobToImage(blob);
  return NextResponse.json({ data: image });
}
