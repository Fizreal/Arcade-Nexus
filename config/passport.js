const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user')
const OwnedList = require('../models/ownedList')
const Wishlist = require('../models/wishlist')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) return cb(null, user)
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value
        })
        await OwnedList.create({
          user: user._id
        })
        await Wishlist.create({
          user: user._id
        })
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser(async (userId, cb) => {
  cb(null, await User.findById(userId))
})
