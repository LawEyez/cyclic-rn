import { Router } from 'express'

import * as PostService from './post.service.js'

// Init router.
const router = Router()

/**
 * Create post.
 */
router.post('/create', async (req, res) => {
  const post = await PostService.create(req.body)
  res.send(post)
})

/**
 * Get single post.
 */
router.get('/get/:key', async (req, res) => {
  const post = await PostService.getByKey(req.params.key)
  res.send(post)
})

/**
 * List posts.
 */
router.get('/', async (req, res) => {
  // Get limit & page.
  const limit = req.query.limit && Number(req.query.limit) ? parseInt(req.query.limit) : 10
  const page = req.query.page && Number(req.query.page) ? parseInt(req.query.page) - 1 : 0

  // Get posts.
  const posts = await PostService.list(limit, page)
  
  res.send(posts)
})

export default router