import { NextResponse } from "next/server";
import { SendPrompt } from "@backend/scripts/ollamaPrompt";
 
export async function POST(req) {
  try {
    const { prompt } = await req.json();
 
    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }
 
    const result = await SendPrompt(prompt);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
 