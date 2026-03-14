import { config } from 'dotenv'
config()

const { default: app } = await import('./src/app.js')
const { default: connectDb } = await import('./src/config/database.js')

connectDb()
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})