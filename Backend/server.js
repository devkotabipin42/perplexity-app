import { config } from 'dotenv'
config()

const { default: app } = await import('./src/app.js')
const { default: connectDb } = await import('./src/config/database.js')
// const { testAi } = await import('./src/services/ai.services.js')
connectDb()

// testAi()
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})