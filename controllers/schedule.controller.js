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
        const schedules = await Schedule.find({assignee: req.user._id}).populate('tags').populate('attendees').exec()
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


router.post('', scheduleValidator, async (req, res) => {
    try {
        const {
            title, 
            description,
            location,
            attendees,
            recurrence,
            tags,
            reminder,
            pinned,
            visibility,
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
            reminder,
            pinned,
            visibility,
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


router.put('/:scheduleId', scheduleValidator, async (req, res) => {
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
            visibility,
            startAt,
            endAt,
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


router.delete('/:scheduleId', async (req, res) => {
    try {
        await Schedule.deleteOne({_id: req.params.scheduleId, assignee: req.user._id})
        res.status(200).send()

    } catch (error) {
        if(error){
            res.status(500).send(error)
        }else{
            res.sendStatus(500)
        }
    }
})


router.post('/truncate', async (req, res) => {
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