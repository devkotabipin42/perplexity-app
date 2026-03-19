 import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi(){
    model.invoke("what is the tallest animal in thw world").then((response)=>{
        console.log(response.text);
        
    })
}

export async function generateResponse(message){
    const response = await model.invoke([
        new HumanMessage(message)
    ])
    return response.text
}