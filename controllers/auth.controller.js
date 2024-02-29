const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const hashPasswordUtil = require('../utils/hashPassword.util')
const User = require('mongoose').model('User')
const bcrypt = require('bcrypt')
const issueJWT = require('../utils/issueJWT')
const authValidator = require('../validators/auth.validator')
const passport = require('passport')



router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).send(null)
})

router.post('/login', authValidator, async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(401).send({errors: {email: ['Invalid email password!']}})
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(401).send({errors: {password: ['Invalid password!']}})
        user.password = ''
        return res.send({message: 'successfully login!', user, ...issueJWT(user)})
    } catch (error) {
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await hashPasswordUtil(password)
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword
        })

        res.status(200).send({
            user, ...issueJWT(user)
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