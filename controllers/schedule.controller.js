const express = require('express')
const Schedule = require('../models/schedule.model')

const passport = require('passport')
const scheduleValidator = require('../validators/schedule.validator')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.use(authMiddleware)

router.get('', async (req, res) => {
    try {
        const schedules = await Schedule.find({user: req.user._id}).populate('tags').populate('user')
       
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

router.get('/:scheduleId', async (req, res) => {
    try {
        const schedule = await Schedule.findOne({user: req.user._id, _id: req.params.scheduleId}).exec()
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


router.post('', scheduleValidator.create, async (req, res) => {
    try {
        const {
            title, 
            location,
            attendees,
            recurrence,
            tags,
            link,
            reminder,
            finished,
            pinned,
            visibility,
            startAt,
            endAt
        } = req.body

        const schedule = new Schedule({
            _id: new mongoose.Types.ObjectId(),
            user: req.user,
            title,
            location,
            attendees,
            recurrence,
            tags,
            link,
            reminder,
            finished,
            pinned,
            visibility,
            startAt,
            endAt,
        })

        await schedule.save()

        if(schedule.tags.length > 0){
            await schedule.populate('tags')
        }

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


router.put('/:scheduleId', scheduleValidator.edit, async (req, res) => {
    try {
        const {
            title, 
            description,
            location,
            attendees,
            recurrence,
            tags,
            pinned,
            reminder,
            finished,
            link,
            visibility,
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
            pinned,
            reminder,
            finished,
            link,
            visibility,
            startAt,
            endAt,
        }, {new: true}).populate('tags').populate('user')

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


router.delete('/:scheduleId', scheduleValidator.remove, async (req, res) => {
    try {
        await Schedule.deleteOne({_id: req.params.scheduleId, user: req.user._id})
        res.status(200).send()

    } catch (error) {
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})

module.exports = router