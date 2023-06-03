const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const Collection = require('../models/collection')
const Game = require('../models/game')

const newCollection = (req, res) => {
  res.render('dashboards/new')
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
    await Collection.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err.message)
    res.redirect('/dashboard')
  }
}

const updateList = async (req, res) => {
  let collection = await Collection.findOne({
    _id: req.params.collectionId,
    user: req.user._id
  })
  let game = await Game.findOne({ gameID: req.params.gameId })

  if (!game) {
    const response = await axios.get(
      `${DOMAIN}games/${req.params.id}?key=${API_KEY}`
    )
    game = response.data

    let genres = []
    let developers = []
    let platforms = []
    let gameModes = []
    game.genres.forEach((genre) => {
      genres.push(genre.name)
    })
    game.developers.forEach((developer) => {
      developers.push(developer.name)
    })
    game.platforms.forEach((platform) => {
      platforms.push(platform.platform.name)
    })
    game.tags.forEach((tag) => {
      if (['Singleplayer', 'Multiplayer'].includes(tag.name))
        gameModes.push(tag.name)
    })

    req.body.gameID = game.id
    req.body.name = game.name
    req.body.imageURL = game.background_image
    req.body.playtime = game.playtime
    req.body.genres = genres
    req.body.developers = developers
    req.body.gameModes = gameModes
    req.body.platforms = platforms
    req.body.userRating = game.rating
    req.body.metacritic = game.metacritic
    req.body.released = game.released
    req.body.description = game.description_raw

    game = await Game.create(req.body)
  }
  try {
    if (!collection.games.includes(game._id)) collection.games.push(game._id)
    await collection.save()
    if (req.body.owned) {
      res.redirect(`/ownedlist/${req.params.gameId}`)
    } else{
      res.redirect(`/games/${req.params.gameId}`)
    }
  } catch (err) {
    console.log(err)
    if (req.body.owned) {
      res.redirect(`/ownedlist/${req.params.gameId}`)
    } else{
      res.redirect(`/games/${req.params.gameId}`)
    }
  }
}

const remove = async (req, res) => {
  let collection = await Collection.findOne({
    _id: req.params.collectionId,
    user: req.user._id
  }).populate('games')
  let idx = collection.games.map(el => el.gameID).indexOf(parseInt(req.params.gameId))

  try {
    collection.games.splice(idx, 1)
    await collection.save()
    res.redirect(`/dashboard/${req.params.collectionId}`)
  } catch (err) {
    console.log(err.message)
    res.redirect(`/dashboard/${req.params.collectionId}`)
  }
}

module.exports = {
  new: newCollection,
  create,
  delete: deleteCollection,
  add: updateList,
  remove
}
