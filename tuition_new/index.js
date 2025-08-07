import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import routes from './routes/index.js'

dotenv.config()
connectDB()
const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api/', routes)
// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
