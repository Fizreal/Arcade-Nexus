const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const dashboardCtrl = require('../controllers/dashboard')

router.get('/', ensureLoggedIn, dashboardCtrl.index)
router.get('/owned', ensureLoggedIn, dashboardCtrl.owned)
router.get('/wishlist', ensureLoggedIn, dashboardCtrl.wishList)
router.get('/:id', ensureLoggedIn, dashboardCtrl.collection)

module.exports = router
