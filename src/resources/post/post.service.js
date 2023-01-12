import db from '../../db/index.js'

import { v4 } from 'uuid'

const Post = db.collection('posts')

/**
 * Create new post.
 * @param {*} data 
 * @returns post
 */
export const create = async (data) => {
  const newPost = await Post.set(v4(), data)
  return newPost
}

/**
 * List all posts.
 * @returns posts
 */
export const list = async () => {
  const posts = await Post.list()
  return posts
}

/**
 * Get post by key.
 * @param {*} key 
 * @returns post
 */
export const getByKey = async (key) => {
  const post = await Post.get(key)
  return post
} 