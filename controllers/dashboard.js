const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const OwnedList = require('../models/ownedList')
const WishList = require('../models/wishList')
const Collection = require('../models/collection')

const index = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id })
  const wishList = await WishList.findOne({ user: req.user._id })
  const collections = await Collection.find({ user: req.user._id })
  console.log(collections)
  res.render('dashboards', { ownedList, wishList, collections })
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

const collection = async (req, res) => {
  const collection = await Collection.findOne({ _id: req.params.id }).populate(
    'games'
  )
  res.render('dashboards/collectionList', { collection })
}

module.exports = { index, owned, wishList, collection }
