import 'module-alias/register.js'
import 'dotenv/config'

import express from 'express'

/** Resource imports */
import post from './resources/post/index.js'

const app = express()
const port = process.env.PORT || 5000

// Middleware.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes.
app.get('/', (req, res) => {
  res.send('Hello Universe')
})
app.use('/api/posts', post)

// Start server.
app.listen(port, () =>
  console.log(`App running on port ${port}...`)
)