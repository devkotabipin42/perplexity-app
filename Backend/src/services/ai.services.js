 import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
 import {ChatMistralAI} from '@langchain/mistralai'
import {AIMessage, HumanMessage,SystemMessage} from 'langchain'



const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model : 'mistral-small-latest',
    apiKey:process.env.MISTRAL_API_KEY
})

// export async function testAi(){
//     model.invoke("what is the tallest animal in thw world").then((response)=>{
//         console.log(response.text);
        
//     })
// }



export async function generateResponse(messages){
    const response = await geminiModel.invoke(messages.map(msg=>
        {
        if (msg.role=='user'){
            return new HumanMessage(msg.content)
        }else if (msg.role=='ai'){
            return new AIMessage(msg.content)
        }
    }
    ))
    return response.text
}

export async function generateChatTitle(message){
    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generate concise and descriptive titles for  chat conversation 
            
            User will provide you with the first message of a chat conversation and you will generate a title that captures 
            that essnece of the conversation in 2-4 words.THE title should be clear relevant and engaging giving users a quick
             understanding of the chat topic` ),
             new HumanMessage(`Generate a tittle for a chat conversation based on the following first message: "${message}" `)
])
    return response.text
}