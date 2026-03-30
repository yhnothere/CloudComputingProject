import { NextResponse } from "next/server";
import { SendPrompt } from "@/lib/ollamaPrompt";

export async function POST(req) {
  try {
    const { prompt, systemPrompt, history } = await req.json(); 

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    const result = await SendPrompt(prompt, systemPrompt, history);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}