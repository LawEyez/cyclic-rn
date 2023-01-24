const cacheMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=30')
  }

  next()
}

export default cacheMiddleware