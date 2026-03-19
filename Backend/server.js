import { config } from 'dotenv'
config()

const { default: app } = await import('./src/app.js')
const { default: connectDb } = await import('./src/config/database.js')

import http from 'http'
import { initSocket } from './src/sockets/server.socket.js'
const httpServer = http.createServer(app)
initSocket(httpServer)
// const { testAi } = await import('./src/services/ai.services.js')
connectDb()
  .catch((err)=>{
    console.error('MongoDB connection failed :',err)
    process.exit(1) 
  })
// testAi()
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000")
})