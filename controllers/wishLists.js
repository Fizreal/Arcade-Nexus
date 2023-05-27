const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const WishList = require('../models/wishList')
const Game = require('../models/game')
const wishlist = require('../models/wishList')

const updateList = async (req, res) => {
  let wishList = WishList.find({ user: user._id })
  let game = await Game.find({ gameID: req.params.id })

  if (!game) {
    game = await axios.get(`${DOMAIN}games/${req.params.id}?key=${API_KEY}`)
      .data
    req.body.gameID = game.id
    req.body.name = game.name
    req.body.imageURL = game.background_image
    req.body.playtime = game.playtime
    req.body.genres = []
    req.body.developers = []
    req.body.gameModes = []
    req.body.userRating = game.rating
    req.body.metacritic = game.metacritic
    req.body.released = game.released

    game.genres.forEach((genre) => {
      req.body.genres.push(genre.name)
    })
    game.developers.forEach((developer) => {
      req.body.developers.push(developer.name)
    })
    game.platforms.forEach((platform) => {
      req.body.platform.push(platform.platform.name)
    })

    game = await Game.create(req.body)
  }

  wishList.games.push(game._id)

  try {
    // Save any changes made to the movie doc
    await wishList.save()
    res.redirect(`/games/${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect(`/games/${req.params.id}`)
  }
}

module.exports = { update: updateList }
