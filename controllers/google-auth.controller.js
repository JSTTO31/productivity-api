const router = require('express').Router()
const passport = require('passport')


router.get('/auth/failure', (req, res) => {
    res.send('failure')
})

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));


router.get('/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/r/access/aD3Vwed6abuoPE2BzInnTKcTKYp',
        failureRedirect: '/auth/failure'
}));


module.exports = router