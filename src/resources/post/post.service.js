import { v4 } from 'uuid'

import db from '../../db/index.js'

const Post = db.collection('updates')

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
export const list = async (limit, page) => {
  let posts = await Post.list()
  posts = await Promise.all(posts.results.map(post => Post.get(post.key)))
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