import { Router } from 'express'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client } from '@aws-sdk/client-s3'

// Init router.
const router = Router()

// Init S3.
const bucketName = 'cyclic-wild-tan-perch-tutu-af-south-1'
const region = 'af-south-1'

const s3 = new S3Client({ region })

/**
 * Create presigned url.
 */
router.post('/presign', async (req, res) => {
  const { url, fields } = await createPresignedPost(s3, {
    Bucket: bucketName,
    Key: `uploads/${req.body.name}`,
    Fields: { 'Content-Type': req.body.type }
  })

  res.send({
    url,
    fields
  })
})

/**
 * Get presigned url.
 */
router.post('/download', async (req, res) => {
  const url = await getSignedUrl(s3, {
    Bucket: bucketName,
    Key: `uploads/${req.body.key}`,
  })

  res.send(url)
})

export default router