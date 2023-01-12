import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware.
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Universe')
})

// Start server.
app.listen(port, () =>
  console.log(`App running on port ${port}...`)
)