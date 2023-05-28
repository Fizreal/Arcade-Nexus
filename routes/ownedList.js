const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('../config/ensureLoggedIn')
const ownedListsCtrl = require('../controllers/ownedList')

router.get('/:id', ensureLoggedIn, ownedListsCtrl.showOwned)
router.get('/:id/edit', ensureLoggedIn, ownedListsCtrl.edit)
router.put('/add/:id', ensureLoggedIn, ownedListsCtrl.add)
router.put('/remove/:id', ensureLoggedIn, ownedListsCtrl.remove)
router.put('/playerinfo/:id', ensureLoggedIn, ownedListsCtrl.update)

module.exports = router
