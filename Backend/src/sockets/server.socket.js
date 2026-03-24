import { Server } from 'socket.io'
let io;

export function initSocket(httpServer){
    io=new Server (httpServer,{
        cors:{
            origin: [
                'http://localhost:5173',
                'https://perplexity-app-six.vercel.app'  // ← yeh add karo
            ],
            credentials:true
        }
    })
    console.log('Socket.io server is runing');
    
    io.on('connection',(socket)=>{
        console.log('A user connect: ' + socket.id)
    })
}

export function getIO(){
    if (!io){
        throw new Error('Socket.io not initialized')
    }

    return io
}