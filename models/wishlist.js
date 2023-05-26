const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Game'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Wishlist', wishlistSchema)
