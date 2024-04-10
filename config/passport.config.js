const LocalStrategy = require('passport-local')
const User = require('mongoose').model('User')
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const { default: mongoose } = require('mongoose');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


/**
 * Passport Local Strategy Configuration Function
 * 
 * @param {*} passport 
 */


async function verifyPassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = function(passport){
      passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/callback",
        passReqToCallback   : true
      },
      async function(request, accessToken, refreshToken, profile, done) {
        try {
          const user = await userModel.findOne({googleId: profile.id})
          if(!user){
            const newUser = new userModel({
              _id: new mongoose.Types.ObjectId(),
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.picture
            })  

            await newUser.save()
            return done(null, newUser)
          }

          done(null, user)

        } catch (error) {
          done(error, false)
        }
      }
    ));




    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            const user = await User.findOne({email})
            if(!user) return done(null, false)
            if(!await verifyPassword(password, user.password)) return done(null, false)
            done(null, user)
        } catch (error) {
            console.log(error)
            done(error, false)
        }
    }))


    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (userId, done) => done(null, await User.findOne({_id: userId})))
}