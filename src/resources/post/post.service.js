import { v4 } from 'uuid'

import db from '../../db/index.js'
import {  _getSignedUrl } from '../../utils/s3.js'

const Post = db.collection('updates')

/**
 * Create new post.
 * @param {*} data 
 * @returns post
 */
export const create = async (data) => {
  let key = data.key || v4()
  delete data.key
  delete data.updated
  delete data.created
  // delete data.image

  let newPost = await Post.set(key, data)
  return newPost
}

/**
 * List all posts.
 * @returns posts
 */
export const list = async (limit, page) => {
  let posts = await Post.list()

  // Get all fields.
  posts = await Promise.all(posts.results.map(post => Post.get(post.key)))

  // Generate image urls.
  posts = await Promise.all(posts.map(async post => {
    if (post.props.image?.trim().length) {
      post.props.image = await _getSignedUrl(post.props.image)
    }

    return post
  }))

  // Sort posts.
  posts = posts.sort((a, b) => b.props.published - a.props.published)

  return posts
}

/**
 * Get post by key.
 * @param {*} key 
 * @returns post
 */
export const getByKey = async (key) => {
  let post = await Post.get(key)

  // Generate image url.
  if (post.props.image?.trim().length) {
    post.props.image = await _getSignedUrl(post.props.image)
  }

  return post
} 

/**
 * Get post by key.
 * @param {*} key 
 * @returns post
 */
export const deleteByKey = async (key) => {
  const post = await Post.delete(key)
  return post
} 