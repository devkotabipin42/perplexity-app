 import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
 import {ChatMistralAI} from '@langchain/mistralai'
import {AIMessage, HumanMessage,SystemMessage,tool,createAgent} from 'langchain'
import * as z from 'zod'
import { searchInternet } from "./internet.service.js";
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

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)
const agent = createAgent({
    model: mistralModel,
    tools: [ searchInternetTool ],
})

export async function generateResponse(messages, imageBase64 = null, imageMimeType = null) {
    console.log(messages)

    // ✅ last user message
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()

    // ✅ agar image hai toh Gemini Vision use karo
    if (imageBase64) {
        const response = await geminiModel.invoke([
            new HumanMessage({
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${imageMimeType};base64,${imageBase64}`
                        }
                    },
                    {
                        type: "text",
                        text: lastUserMsg?.content || "Analyze this image"
                    }
                ]
            })
        ])
        return response.text
    }

    // ✅ normal text response — same as before
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool.
            `),
            ...(messages.map(msg => {
                if (msg.role === "user") return new HumanMessage(msg.content)
                else if (msg.role === "ai") return new AIMessage(msg.content)
            }).filter(Boolean))
        ]
    })

    return response.messages[response.messages.length - 1].text
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