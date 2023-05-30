const mongoose = require('mongoose')

const Schema = mongoose.Schema

const collectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Game'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Collection', collectionSchema)
