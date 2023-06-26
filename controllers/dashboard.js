const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const OwnedList = require('../models/ownedList')
const WishList = require('../models/wishlist')
const Collection = require('../models/collection')

const index = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  const wishList = await WishList.findOne({ user: req.user._id }).populate(
    'games'
  )
  const collections = await Collection.find({ user: req.user._id }).populate(
    'games'
  )
  let backlog = ownedList.games.filter(
    (gameObject) => gameObject.status === 'Backlog'
  )
  res.render('dashboards', { ownedList, backlog, wishList, collections })
}

const owned = async (req, res) => {
  const ownedGames = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let backlog
  let ownedList = ownedGames.games
  res.render('dashboards/ownedList', { ownedList, backlog })
}

const backlog = async (req, res) => {
  const ownedGames = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let ownedList = ownedGames.games.filter(
    (gameObject) => gameObject.status === 'Backlog'
  )
  let backlog = ownedList.reduce(
    (acc, gameObj) => acc + gameObj.game.playtime,
    0
  )
  res.render('dashboards/ownedList', { ownedList, backlog })
}

const wishList = async (req, res) => {
  const wishList = await WishList.findOne({ user: req.user._id }).populate(
    'games'
  )
  res.render('dashboards/wishList', { wishList })
}

const collection = async (req, res) => {
  const collection = await Collection.findOne({ _id: req.params.id }).populate(
    'games'
  )
  res.render('dashboards/collectionList', { collection })
}

module.exports = { index, owned, backlog, wishList, collection }
