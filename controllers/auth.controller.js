const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('mongoose').model('User')
const hashedPasswordUtil = require('../utils/hashPassword.util')
const authValidator = require('../validators/auth.validator')
const registerValidator = require('../validators/register.validator')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middleware')
const userModel = require('../models/user.model')



router.get('/check/', authMiddleware, async (req, res) => {
    // const users = await userModel.find({})
    // return res.status(200).send({users})   


    // const users = await userModel.find({})
    // users.forEach(async (user) => {
    //     await user.updateOne({picture: `https://ui-avatars.com/api/?name=${user.name}&background=random&color=random`})
    // })

    // return res.status(200).send({users})   

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
        const hashedPassword = await hashedPasswordUtil(password)
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword,
            picture: `https://ui-avatars.com/api/?name=${name}&background=random&color=random`
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