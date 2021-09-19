const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    imageUrl: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passWord: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', usersSchema)
