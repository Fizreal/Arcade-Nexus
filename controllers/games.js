const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const OwnedList = require('../models/ownedList')
const WishList = require('../models/wishList')

const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}games?page_size=24&key=${API_KEY}`)
  let games = response.data.results
  res.render('games', { games })
}

const show = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}games/${req.params.id}?key=${API_KEY}`
  )
  let game = response.data
  let ownedGames
  let wishListGames
  if (req.user) {
    let ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
      'games.game'
    )
    ownedGames = ownedList.games.map((gameObj) => gameObj.game.gameID)
    let wishList = await WishList.findOne({ user: req.user._id }).populate(
      'games'
    )
    wishListGames = wishList.games.map((gameObj) => gameObj.gameID)
  }
  res.render('games/show', { game, ownedGames, wishListGames })
}

const search = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}games?page_size=24&key=${API_KEY}&search=${req.query.search}`
  )

  let games = response.data.results
  res.render('games', { games })
}

module.exports = { index, show, search }
