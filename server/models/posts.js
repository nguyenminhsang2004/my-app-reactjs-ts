const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('posts', postSchema)
