const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const Collection = require('../models/collection')
const Game = require('../models/game')

const newCollection = (req, res) => {
  res.render('dashbaords/new')
}
const create = async (req, res) => {
  try {
    await Collection.create({
      name: req.body.name,
      user: req.user._id
    })
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err.message)
    res.redirect('/dashboard')
  }
}

const deleteCollection = async (req, res) => {
  try {
    Collection.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err.message)
    res.redirect('/dashboard')
  }
}

module.exports = {
  new: newCollection,
  create,
  delete: deleteCollection
}
