const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const ownedListsCtrl = require('../controllers/ownedGames')

router.put('/:id', ensureLoggedIn, ownedListsCtrl.update)

module.exports = router