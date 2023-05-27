const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const wishListCtrl = require('../controllers/wishLists')

router.put('/:id', ensureLoggedIn, wishListCtrl.update)

module.exports = router
