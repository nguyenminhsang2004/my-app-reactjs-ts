var express = require('express')
var router = express.Router()
const post_md = require('../models/posts')
const note_md = require('../models/notes')

router.get('/statistics', async (req, res) => {
  try {
    // like count by pots list
    const postList = await post_md.find({ author: '6134e6b506b287330ea1f2c0' })
    const noteList = await note_md.find({ author: '6134e6b506b287330ea1f2c0' })
    let likeCount = 0
    postList.forEach((item) => {
      likeCount += item.like
    })

    res.json({
      success: true,
      content: {
        message: 'Success',
        data: { postCount: postList.length, likeCount, noteCount: noteList.length },
      },
    })
  } catch (error) {
    console, log(error)
    res
      .status(500)
      .json({ success: false, content: { message: 'Internal server error', data: null } })
  }
})

module.exports = router
