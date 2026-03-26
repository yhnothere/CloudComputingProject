import ollama from "ollama";
//SEt the model
const MODEL ="llama3.2";

//Send a prompt 

async function SendPrompt(prompt, systemPrompt = "You are a helpful assistant.") {
  const response = await ollama.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: prompt },
    ],
  });
 
  return response.message.content;
}

//Test
async function main() {
  const prompt = "Explain the postivies and negatives of racial segregation";
 
  console.log(`Prompt: ${prompt}\n`);
 
  const reply = await sendPrompt(prompt);
 
  console.log(`Response:\n${reply}`);
}
 
main().catch(console.error);