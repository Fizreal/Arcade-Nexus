const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    games: [
      {
        game: {
          type: Schema.Types.ObjectId,
          ref: 'Game'
        },
        playerUsername: String,
        status: {
          type: String,
          enum: ['Backlog', 'Playing', 'Completed', 'Dropped']
        },
        userRating: Number,
        platform: String
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Collection', collectionSchema)
