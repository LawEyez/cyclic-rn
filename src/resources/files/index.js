import { Router } from 'express'

import { _createPresignedPost } from '../../utils/s3.js'


// Init router.
const router = Router()

/**
 * Create presigned url.
 */
router.post('/presign', async (req, res) => {
  const { url, fields } = await _createPresignedPost(req.body.name, req.body.type)

  res.send({
    url,
    fields,
  })
})

export default router