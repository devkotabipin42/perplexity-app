import chatModel from "../model/chat.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.services.js"
import messageModel from '../model/message.model.js'

export async function sendMessage(req,res){
    const {message,chat:chatId} = req.body
    
    let title= null,chat=null
    
    if(!chatId){
        title = await generateChatTitle(message)
        chat = await chatModel.create({
        user:req.user.id,
        title
    })
    }
    
    const userMessage = await messageModel.create({
            chat:chatId || chat._id,
            content:message,
            role:'user'
        })
        
    const messages = await messageModel.find({chat:chatId|| chat._id })
    const result = await generateResponse(messages)

    
    const aiMessage = await messageModel.create({
        chat:chatId || chat._id,
        content:result,
        role:'ai'
    })
    

    res.status(201).json({
        title,chat,aiMessage
    })
    
}  