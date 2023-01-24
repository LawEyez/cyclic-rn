import 'module-alias/register.js'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

/** Resource imports */
import post from './resources/post/index.js'
import files from './resources/files/index.js'

import cacheMiddleware from './utils/cache.middleware.js'

const app = express()
const port = process.env.PORT || 5000

// Middleware.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cacheMiddleware)

// Routes.
app.get('/', (req, res) => {
  res.send('Hello Universe')
})
app.use('/api/posts', post)
app.use('/api/files', files)

// Start server.
app.listen(port, () =>
  console.log(`App running on port ${port}...`)
)