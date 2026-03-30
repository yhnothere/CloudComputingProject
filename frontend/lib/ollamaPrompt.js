import ollama from "ollama";

const MODEL = "llama3.2";

export async function SendPrompt(
  prompt,
  systemPrompt = "You are a helpful assistant.",
  history = []
) {
  const response = await ollama.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      ...history,                            
      { role: "user", content: prompt },
    ],
  });

  return response.message.content;
}