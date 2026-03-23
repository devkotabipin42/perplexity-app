import chatModel from "../model/chat.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.services.js"
import messageModel from '../model/message.model.js'
import fs from 'fs'
export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body
    const imageFile = req.file  // ✅ uploaded image

    let title = null, chat = null

    if (!chatId) {
        title = await generateChatTitle(message || "Image analysis")
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    // ✅ image base64 convert karo agar hai toh
    let imageBase64 = null
    let imageMimeType = null
    if (imageFile) {
        imageBase64 = fs.readFileSync(imageFile.path, { encoding: 'base64' })
        imageMimeType = imageFile.mimetype
        fs.unlinkSync(imageFile.path) // temp file delete karo
    }

    await messageModel.create({
        chat: chatId || chat._id,
        content: message || "Analyze this image",
        role: 'user'
    }) 
    const messages = await messageModel.find({ chat: chatId || chat._id })
    const result = await generateResponse(messages, imageBase64, imageMimeType)

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: 'ai'
    })

    res.status(201).json({ title, chat, aiMessage })
}

export async function getChats(req,res){
    const user = req.user

    const chats = await chatModel.find({user:user.id})

    res.status(200).json({
        message:'Chats retrived sucessfully',
        chats
    })
}

export async function getMessage(req,res){
    const {chatId} = req.params

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })
    if(!chat){
        return res.status(404).json({
            message:'Chat not found'
        })
    }
    const messages = await messageModel.find({
        chat:chatId
    })

    res.status(200).json({
        message:'Mesage retrived sucessfully',
        messages
    })
}

export async function deleteChat(req, res) {

    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}