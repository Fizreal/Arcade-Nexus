const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()

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
  res.render('games/show', { game })
}

const search = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}games?page_size=24&key=${API_KEY}&search=${req.query.search}`
  )

  let games = response.data.results
  res.render('games', { games })
}

module.exports = { index, show, search }
