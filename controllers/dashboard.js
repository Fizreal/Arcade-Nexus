const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const OwnedList = require('../models/ownedList')
const WishList = require('../models/wishList')

const index = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id })
  const wishList = await WishList.findOne({ user: req.user._id })
  res.render('dashboards', { ownedList, wishList })
}
const owned = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  res.render('dashboards/ownedList', { ownedList })
}
const wishList = async (req, res) => {
  const wishList = await WishList.findOne({ user: req.user._id }).populate(
    'games'
  )
  res.render('dashboards/wishList', { wishList })
}

module.exports = { index, owned, wishList }
