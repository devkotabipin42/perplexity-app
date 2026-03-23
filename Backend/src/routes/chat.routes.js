import { Router } from "express";
import { sendMessage,getChats,getMessage,deleteChat } from "../controller/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const chatRouter= Router()
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })
chatRouter.post('/message',authUser,upload.single('image'),sendMessage)

chatRouter.get('/',authUser,getChats)

chatRouter.get('/:chatId/messages',authUser,getMessage)

chatRouter.delete('/delete/:chatId',authUser,deleteChat)


export default chatRouter