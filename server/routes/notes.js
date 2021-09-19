var express = require('express')
var router = express.Router()
const verifyToken = require('../utils/verifyToken')
const note_md = require('../models/notes')

// get all data
router.get('/get-all', async (req, res, next) => {
  try {
    const notes = await note_md
      .find({ author: '6134e6b506b287330ea1f2c0' })
      .populate('author', ['fullName', 'imageUrl'])
      .exec()
    res.json({ success: true, content: { message: 'Success', data: notes } })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// add new note
router.post('/add', async (req, res) => {
  const { data } = req.body
  if (!data.title || !data.content) {
    res.json({
      success: false,
      content: { message: 'Title or content is required', data: null },
    })
  }
  try {
    const newNote = new note_md({
      ...data,
      author: '6134e6b506b287330ea1f2c0',
    })
    await newNote.save()
    res.json({
      success: true,
      content: { message: 'Create successfully', data: newNote },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// get note by id
router.get('/get-by-id/:id', async (req, res) => {
  try {
    const note = await post_md.findOne({ _id: req.params.id })
    res.json({
      success: true,
      content: { message: 'Create successfully', data: note },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// update note by id
router.put('/update/:id', async (req, res) => {
  const { data } = req.body
  if (!data.title || !data.content) {
    res.json({
      success: false,
      content: { message: 'Title or content is required', data: null },
    })
  }
  try {
    let updatedNote = { ...data }
    updatedNote = await note_md.findByIdAndUpdate(
      { _id: data._id, author: '6134e6b506b287330ea1f2c0' },
      updatedNote,
      { new: true }
    )

    if (!updatedNote) {
      res.json({
        success: false,
        content: {
          message: 'Note not found or user not authorization',
          data: null,
        },
      })
    }

    res.json({
      success: true,
      content: { message: 'Update successfully', data: updatedNote },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      content: { message: 'Internal server error', data: null },
    })
  }
})

// remove note by id
router.delete('/remove/:id', async (req, res) => {
  try {
    const isDelete = await note_md.findOneAndDelete({
      _id: req.params.id,
      author: '6134e6b506b287330ea1f2c0',
    })

    if (!isDelete) {
      res.json({
        success: false,
        message: 'Note not found or user not authorization',
      })
    }

    res.json({ success: true, message: 'Delete successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
