const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const wishListCtrl = require('../controllers/wishLists')

router.put('/add/:id', ensureLoggedIn, wishListCtrl.add)
router.put('/remove/:id', ensureLoggedIn, wishListCtrl.remove)

module.exports = router
