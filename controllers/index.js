const axios = require('axios')
const API_KEY = process.env.RAWG_KEY
const DOMAIN = 'https://api.rawg.io/api/'
require('dotenv').config()

const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}games?page_size=24&key=${API_KEY}`)
  let games = response.data.results
  // console.log(games)
  res.render('', { title: 'Arcade Nexus', games })
}

module.exports = { index }
