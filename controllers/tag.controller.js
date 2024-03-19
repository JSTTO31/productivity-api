const express = require('express')
const tagModel = require('../models/tag.model')
const passport = require('passport')
const tagValidator = require('../validators/tag.validator')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.use(authMiddleware)

router.get('', async (req, res) => {
    try {
        const tags = await tagModel.find({owner: req.user._id}).exec()
        res.status(200).send(tags)
    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

router.get('/:tagId', async (req, res) => {
    try {
        const tag = await tagModel.findOne({owner: req.user._id, _id: req.params.tagId}).exec()
        res.status(200).send({
            tag
        })
    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})


router.post('', passport.authenticate('jwt', {session: false}), tagValidator, async (req, res) => {
    try {
        const {label, color} = req.body
        const tag = new tagModel({
            _id: new mongoose.Types.ObjectId(),
            label, color, 
            type: 'schedule',
            default: false,
            owner: req.user._id
        })

        await tag.save()

        res.status(200).send({
            tag
        })


    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

router.put('/:tagId', passport.authenticate('jwt', {session: false}), tagValidator, async (req, res) => {
    try {
        const {label, color} = req.body
        const tag = await tagModel.findOne({_id: req.params.tagId})
        tag.label = label
        tag.color = color
        tag.save()

        res.status(200).send({
            tag
        })


    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})


router.delete('/:tagId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await tagModel.deleteOne({_id: req.params.tagId, owner: req.user._id})
        res.status(200).send()


    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})


router.post('/truncate', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await tagModel.deleteMany()
        res.status(200).send()


    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

module.exports = router