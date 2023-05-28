const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()
const OwnedList = require('../models/ownedList')
const WishList = require('../models/wishList')
const Game = require('../models/game')

const updateList = async (req, res) => {
  let ownedList = await OwnedList.findOne({ user: req.user._id })
  let wishList = await WishList.findOne({ user: req.user._id })
  let game = await Game.findOne({ gameID: req.params.id })

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

  let ownedGames = await ownedList.populate('games.game')
  let gameIDs = ownedGames.games.map((gameObj) => gameObj.game.gameID)
  try {
    if (!gameIDs.includes(game.gameID)) {
      ownedList.games.push({ game: game._id, status: 'Backlog' })
      if (wishList.games.includes(game._id)) {
        let idx = wishList.games.indexOf(game._id)
        wishList.games.splice(idx, 1)
      }
    }
    await ownedList.save()
    await wishList.save()
    res.redirect(`/games/${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect(`/games/${req.params.id}`)
  }
}

const remove = async (req, res) => {
  let ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let gameObjects = ownedList.games
  let idx = gameObjects
    .map((el) => el.game.gameID)
    .indexOf(parseInt(req.params.id))

  console.log(ownedList, idx)
  try {
    ownedList.games.splice(idx, 1)
    await ownedList.save()
    res.render('dashboards/ownedList', { ownedList })
  } catch (err) {
    console.log(err.message)
    res.render('dashboards/ownedList', { ownedList })
  }
}

const showOwned = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let gameObjects = ownedList.games
  let idx = gameObjects
    .map((el) => el.game.gameID)
    .indexOf(parseInt(req.params.id))
  let gameObj = gameObjects[idx]

  console.log(gameObjects, idx, gameObj)
  res.render('dashboards/showOwned', { gameObj })
}

const edit = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let gameObjects = ownedList.games
  let idx = gameObjects
    .map((el) => el.game.gameID)
    .indexOf(parseInt(req.params.id))
  let gameObj = gameObjects[idx]

  console.log(gameObjects, idx, gameObj)
  res.render('dashboards/playerInfo', { gameObj })
}

const update = async (req, res) => {
  const ownedList = await OwnedList.findOne({ user: req.user._id }).populate(
    'games.game'
  )
  let gameObjects = ownedList.games
  let idx = gameObjects
    .map((el) => el.game.gameID)
    .indexOf(parseInt(req.params.id))
  let gameObj = gameObjects[idx]

  gameObj.playerUsername = req.body.playerUsername
  gameObj.platform = req.body.platform
  gameObj.userRating = req.body.userRating
  gameObj.status = req.body.status

  console.log(gameObj)
  try {
    await ownedList.save()
    res.redirect(`/ownedlist/${req.params.id}`)
  } catch (err) {
    console.log(err.message)
    res.redirect(`/ownedlist/${req.params.id}`)
  }
}

module.exports = { add: updateList, remove, showOwned, edit, update }
