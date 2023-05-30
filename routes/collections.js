const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const collectionsCtrl = require('../controllers/collections')

router.get('/new', ensureLoggedIn, collectionsCtrl.new)
router.post('/create', ensureLoggedIn, collectionsCtrl.create)

module.exports = router
