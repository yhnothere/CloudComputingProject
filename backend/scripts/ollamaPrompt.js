import ollama from "ollama";
//SEt the model
const MODEL ="llama3.2";

//Send a prompt 

export async function SendPrompt(prompt, systemPrompt = "Give a short 1 line response") {
  console.log("Testing response");
  const response = await ollama.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: prompt },
    ],
  });
   console.log(`Client :\n${response.message.content}`);
  return response.message.content;
}
export async function TestPrompt() {
  const prompt = "Explain the postivies and negatives of racial segregation";
 
  console.log(`Prompt: ${prompt}\n`);
 
  const reply = await SendPrompt(prompt);
 
  console.log(`Response:\n${reply}`);
}
//Test
// async function main() {
//   const prompt = "Explain the postivies and negatives of racial segregation";
 
//   console.log(`Prompt: ${prompt}\n`);
 
//   const reply = await SendPrompt(prompt);
 
//   console.log(`Response:\n${reply}`);
// }
 
// main().catch(console.error);