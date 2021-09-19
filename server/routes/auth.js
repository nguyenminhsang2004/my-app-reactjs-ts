var express = require('express')
var router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const user_md = require('./../models/users')

/* GET home page. */
router.post('/register', async (req, res, next) => {
  const { user } = req.body
  if (!user.email || !user.passWord)
    return res.json({
      success: false,
      content: {
        message: 'Missing email or pass word.',
        accessToken: null,
        user: null,
      },
    })

  try {
    const isExist = Boolean(await user_md.findOne({ email: user.email }))
    if (isExist)
      return res.json({
        success: false,
        content: {
          message: 'Email already taken.',
          accessToken: null,
          user: null,
        },
      })

    user.passWord = await argon2.hash(user.passWord)

    const newUser = new user_md(user)
    await newUser.save()
    const accessToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.TOKEN_SECRET_KEY
    )
    return res.json({
      success: true,
      content: {
        message: 'User created successfully.',
        accessToken,
        user: newUser,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: {
        message: 'Internal server error',
        accessToken: null,
        user: null,
      },
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, passWord } = req.body.userLogin
  if (!email || !passWord)
    return res.json({
      success: false,
      content: {
        message: 'Missing email or pass word.',
        accessToken: null,
        user: null,
      },
    })

  try {
    const user = await user_md.findOne({ email })

    if (!user)
      return res.json({
        success: false,
        content: {
          message: 'Incorrect email or pass word',
          accessToken: null,
          user: null,
        },
      })

    const validatePass = await argon2.verify(user.passWord, passWord)
    if (!validatePass)
      return res.json({
        success: false,
        content: {
          message: 'Incorrect email or pass word',
          accessToken: null,
          user: null,
        },
      })

    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET_KEY)
    return res.json({
      success: true,
      content: {
        message: 'Logged is successfully.',
        accessToken,
        user,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: {
        message: 'Internal server error',
        accessToken: null,
        user: null,
      },
    })
  }
})

module.exports = router
