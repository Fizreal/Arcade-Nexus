const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const collectionsCtrl = require('../controllers/collections')

router.get('/new', ensureLoggedIn, collectionsCtrl.new)
router.post('/', ensureLoggedIn, collectionsCtrl.create)
router.delete('/:id', ensureLoggedIn, collectionsCtrl.delete)

module.exports = router
