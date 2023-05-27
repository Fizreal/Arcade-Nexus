const express = require('express')
const router = express.Router()
const passport = require('passport')

const indexCtrl = require('../controllers/index')

/* GET home page. */

router.get('/', indexCtrl.index)

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
)

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.get('/logout', function (req, res) {
  req.logout(() => {
    res.redirect('/')
  })
})

module.exports = router
