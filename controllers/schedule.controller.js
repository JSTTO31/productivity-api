const express = require('express')
const Schedule = require('../models/schedule.model')

const passport = require('passport')
const scheduleValidator = require('../validators/schedule.validator')
const mongoose = require('mongoose')
const router = express.Router()

router.get('', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const schedules = await Schedule.find({assignee: req.user._id}).exec()
        res.status(200).send({
            schedules
        })
    } catch (error) {
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

router.get('/:scheduleId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const schedule = await Schedule.findOne({assignee: req.user._id, _id: req.params.scheduleId}).exec()
        res.status(200).send({
            schedule
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


router.post('', passport.authenticate('jwt', {session: false}), scheduleValidator, async (req, res) => {
    try {
        const {
            title, 
            description,
            location,
            attendees,
            recurrence,
            tags,
            alert,
            priority,
            visibility,
            comments,
            startAt,
            endAt
        } = req.body

        const schedule = new Schedule({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            location,
            attendees,
            recurrence,
            tags,
            alert,
            priority,
            visibility,
            comments,
            startAt,
            endAt,
            assignee: req.user._id
        })

        await schedule.save()

        res.status(200).send({
            schedule
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

router.put('/:scheduleId', passport.authenticate('jwt', {session: false}), scheduleValidator, async (req, res) => {
    try {
        const {
            title, 
            description,
            location,
            attendees,
            recurrence,
            tags,
            alert,
            priority,
            visibility,
            comments,
            startAt,
            endAt
        } = req.body

        const schedule = await Schedule.findOneAndUpdate({_id: req.params.scheduleId}, {
            title,
            description,
            location,
            attendees,
            recurrence,
            tags,
            alert,
            priority,
            visibility,
            comments,
            startAt,
            endAt,
            assignee: req.user._id
        }, {new: true})

        res.status(200).send({schedule})

    } catch (error) {
        console.log(error);
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})


router.delete('/:scheduleId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await Schedule.deleteOne({_id: req.params.tagId, assignee: req.user._id})
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
        
        await Schedule.deleteMany()
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