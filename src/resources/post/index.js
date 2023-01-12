import { Router } from 'express'

import * as PostService from './post.service.js'

// Init router.
const router = Router()

/**
 * Create post.
 */
router.post('/', async (req, res) => {
  const post = await PostService.create(req.body)
  res.send(post)
})

/**
 * List posts.
 */
router.get('/', async (req, res) => {
  const posts = await PostService.list()
  res.send(posts)
})

/**
 * Get single post.
 */
router.get('/:key', async (req, res) => {
  const post = await PostService.getByKey(req.params.key)
  res.send(post)
})

export default router