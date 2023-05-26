const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema(
  {
    //TBD
  },
  { timestamps: true }
)

module.exports = mongoose.model('Game', gameSchema)
