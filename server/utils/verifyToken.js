const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token)
    return res
      .status(401)
      .json({ success: false, content: { message: 'Access token not found.', data: null } })

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(403)
      .json({ success: false, content: { message: 'Invalid token.', data: null } })
  }
}

module.exports = verifyToken
