const express = require('express')
const router = express.Router()
const passport = require('passport')

const collectionsCtrl = require('../controllers/collections')

router.put('/:id', collectionsCtrl.update)

module.exports = router
