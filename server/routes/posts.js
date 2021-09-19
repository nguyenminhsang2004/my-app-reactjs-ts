var express = require('express')
var router = express.Router()
const verifyToken = require('../utils/verifyToken')
const post_md = require('../models/posts')

// get all post
router.get('/get-all', async (req, res, next) => {
  try {
    const posts = await post_md
      .find({ author: '6134e6b506b287330ea1f2c0' })
      .populate('author', ['fullName', 'imageUrl'])
      .exec()
    res.json({ success: true, content: { message: 'Success', data: posts } })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// add new post
router.post('/add', async (req, res) => {
  const { data } = req.body
  if (!data.title || !data.content) {
    res.json({
      success: false,
      content: { message: 'Title or content is required', data: null },
    })
  }
  try {
    const newPost = new post_md({
      ...data,
      author: '6134e6b506b287330ea1f2c0',
    })
    await newPost.save()
    res.json({
      success: true,
      content: { message: 'Create successfully', data: newPost },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// get post by id
router.get('/get-by-id/:id', async (req, res) => {
  try {
    const post = await post_md.findOne({ _id: req.params.id })
    res.json({
      success: true,
      content: { message: 'Create successfully', data: post },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// update post by id
router.put('/update/:id', async (req, res) => {
  const { data } = req.body
  if (!data.title || !data.content) {
    res.json({
      success: false,
      content: { message: 'Title or content is required', data: null },
    })
  }
  try {
    let updatedPost = { ...data }
    updatedPost = await post_md.findByIdAndUpdate(
      { _id: data._id, author: '6134e6b506b287330ea1f2c0' },
      updatedPost,
      { new: true }
    )

    if (!updatedPost) {
      res.json({
        success: false,
        content: {
          message: 'Post not found or user not authorization',
          data: null,
        },
      })
    }

    res.json({
      success: true,
      content: { message: 'Update successfully', data: updatedPost },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// remove post by id
router.delete('/remove/:id', async (req, res) => {
  try {
    const isDelete = await post_md.findOneAndDelete({
      _id: req.params.id,
      author: '6134e6b506b287330ea1f2c0',
    })

    if (!isDelete) {
      res.json({
        success: false,
        message: 'Post not found or user not authorization',
      })
    }

    res.json({ success: true, message: 'Delete successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
