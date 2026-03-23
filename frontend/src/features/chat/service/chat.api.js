import axios from "axios";

const api = axios.create({
    baseURL: "https://perplexity-app-1.onrender.com",
    withCredentials: true,
})


export const sendMessage = async ({ message, chatId, image }) => {
    // ✅ agar image hai toh FormData use karo
    if (image) {
        const formData = new FormData()
        if (message) formData.append('message', message)
        if (chatId) formData.append('chat', chatId)
        formData.append('image', image)
        const response = await api.post("/api/chat/message", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    }

    const response = await api.post("/api/chat/message", { message, chat: chatId })
    return response.data
}

export const getChats = async () => {
    const response = await api.get("/api/chat")
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chat/${chatId}/messages`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}
