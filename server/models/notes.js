const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['COMPLETED', 'NOT COMPLETED'],
      default: 'NOT COMPLETED',
    },
    completedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('notes', noteSchema)
