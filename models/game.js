const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gameSchema = new Schema(
  {
    gameID: Number,
    name: String,
    imageURL: String,
    playtime: Number,
    genres: [],
    developers: [],
    gameModes: [],
    userRating: Number,
    metacritic: Number,
    releaseDate: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('Game', gameSchema)
