const express = require('express')
const router = express.Router()
const passport = require('passport')

const wishListCtrl = require('../controllers/wishLists')

router.put('/:id', wishListCtrl.update)

module.exports = router
