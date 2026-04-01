import { Ollama } from "ollama";

const client = new Ollama({
  host: process.env.OLLAMA_HOST ?? "http://localhost:11434",
});

const MODEL = "llama3.2";

export async function SendPrompt(
  prompt: string,
  systemPrompt: string = "You are a helpful assistant.",
  history: [] 
) {
  const response = await client.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: prompt },
    ],
  });

  return response.message.content;
}