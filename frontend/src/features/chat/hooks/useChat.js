import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage,getChats,getMessages,deleteChat } from "../service/chat.api";
import {addMessages, addNewMessage, cretateNewChat, setChats, setCurrentChatId, setError, setLoading} from '../chat.slice'
import { useDispatch } from "react-redux";
export const useChat = ()=>{

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId,image }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId,image })
        const { chat, aiMessage } = data
        if (!chatId)
            dispatch(cretateNewChat({
                chatId: chat._id,
                title: chat.title,
            }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: message,
            role: "user",
            image: image ? URL.createObjectURL(image) : null,
        }))
        dispatch(addNewMessage({
            chatId: chatId || chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
       if (!chatId && chat?._id) {
        dispatch(setCurrentChatId(chat._id))
    }
    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[ chat._id ] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

     async function handleOpenChat(chatId, chats) {

        console.log(chats[ chatId ]?.messages.length)

        if (chats[ chatId ]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role,
            }))

            dispatch(addMessages({
                chatId,
                messages: formattedMessages,
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketConnection,handleSendMessage,handleGetChats,handleOpenChat
    }
}