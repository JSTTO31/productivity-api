const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('mongoose').model('User')
const authValidator = require('../validators/auth.validator')
const registerValidator = require('../validators/register.validator')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middleware')



router.get('/check/', authMiddleware, (req, res) => {
    res.status(200).send({message: 'welcome back user!', user: req.user})
})

router.post('/logout/', authMiddleware, (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err)
        res.status(200).send({message: 'Successfully Logout!'})
    })
})

router.post('/login', authValidator, passport.authenticate('local'), (req, res) => {
    res.status(200).send({message: 'successfully login!', user: req.user})
})

router.post('/register', registerValidator, async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await hashPasswordUtil(password)
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        })

        req.login(user, (err) => {
            if(err) return next(err)
            res.status(200).send({message: 'successfully register'})
        })
        
    } catch (error) {
        console.log(error);
        if(!error){
            res.sendStatus(500)
        }else{
            res.status(422).send(error)
        }
    }
}, )


module.exports = router