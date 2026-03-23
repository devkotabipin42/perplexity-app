import { io } from "socket.io-client";

export const initializeSocketConnection = () => {
    const socket = io('https://perplexity-app-1.onrender.com',{
        withCredentials:true
    })

    socket.on ('connect',()=>{
        console.log('Connect to Socket.IO server')
    })
}