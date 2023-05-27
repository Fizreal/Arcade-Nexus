const express = require('express')
const router = express.Router()
const gamesCtrl = require('../controllers/games')

router.get('/', gamesCtrl.index)
router.get('/search', gamesCtrl.search)
router.get('/:id', gamesCtrl.show)

module.exports = router
