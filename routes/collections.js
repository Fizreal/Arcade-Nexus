const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const collectionsCtrl = require('../controllers/collections')

router.put('/:id', ensureLoggedIn, collectionsCtrl.update)

module.exports = router
