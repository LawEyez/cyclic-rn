import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

// Init S3.
const bucketName = 'cyclic-wild-tan-perch-tutu-af-south-1'
const region = 'af-south-1'

const s3 = new S3Client({ region })

/**
 * Create presigned post.
 * @param {*} fileName 
 * @param {*} fileType 
 * @returns 
 */
export const _createPresignedPost = async (fileName, fileType) => {
  const { url, fields } = await createPresignedPost(s3, {
    Bucket: bucketName,
    Key: `uploads/${fileName}`,
    Fields: { 'Content-Type': fileType }
  })

  return { url, fields }
}

/**
 * Get signed url.
 * @param {*} key 
 * @returns 
 */
export const _getSignedUrl = async (key) => {
  const url = await getSignedUrl(s3, new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  }))

  return url
}