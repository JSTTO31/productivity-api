const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')
const userModel = require('../models/user.model')
const mongoose = require('mongoose')
const infoValidator = require('../validators/info.validator')
const changePassword = require('../validators/change-password.validator')
const hashedPassword = require('../utils/hashPassword.util')


router.put('/preference', authMiddleware, async (req, res) => {
    try {
        const {preference} = req.body
        const user = await userModel.findOneAndUpdate({_id: req.user._id,}, {preference}, {new: true})

        res.status(200).send({user})
    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong with ' + req.url)
    }
})

router.put('/info/', authMiddleware, infoValidator, async (req, res) => {
    try {
        const {name, email} = req.body
        const user = await userModel.findOneAndUpdate({_id: req.user._id}, {name, email}, {new: true})

        res.status(200).send({user})
    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong with ' + req.url)
    }
})

router.put('/change-password/', authMiddleware, changePassword, async (req, res) => {
    try {
        const {newPassword} = req.body
        const hashed = hashedPassword(newPassword)
        const user = await userModel.findOneAndUpdate({_id: req.user._id}, {password: hashed}, {new: true})
        req.logout((err) => {
            if(err) return next(err)
            res.status(200).send({message: 'Successfully Logout!'})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong with ' + req.url)
    }
})

router.get('/', async  (req, res) => {
    const filter = {}
    const users = await mongoose.model('User').find(filter).limit(5)
    res.status(200).send({users})
})

router.post('/setup', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate({_id: req.user._id,}, {setup: true}, {new: true})

        res.status(200).send({user})
    } catch (error) {
        console.log(error)
        res.status(500).send('Something wrong with ' + req.url)
    }
})


module.exports = router