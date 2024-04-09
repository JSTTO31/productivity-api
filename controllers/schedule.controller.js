const express = require('express')
const Schedule = require('../models/schedule.model')
const passport = require('passport')
const scheduleValidator = require('../validators/schedule.validator')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware')
const tagModel = require('../models/tag.model')
const router = express.Router()

const colorGenerator = require('../utils/useColorGenerator.util')
const scheduleModel = require('../models/schedule.model')
const userModel = require('../models/user.model')

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

router.post('/recommendation', async function(req, res){
    try {
        const {selected} = req.body
        if(!Array.isArray(selected)) return res.status(422).send('The field must be an array!')
        const routines = [
            {
              id: 1,
              title: "Morning Routine",
              tag: "Self-Care",
              location: "Home",
              recurrence: "daily",
              startAt: new Date().setHours(7, 0, 0, 0), // Set start time to 7:00 AM
              endAt: new Date().setHours(8, 0, 0, 0), // Set end time to 8:00 AM
              description: "Start the day feeling refreshed and focused.",
            },
            {
              id: 2,
              title: "Study Session 1",
              tag: "Study",
              location: "Library",
              recurrence: "daily",
              startAt: new Date().setHours(9, 0, 0, 0), // Set start time to 9:00 AM
              endAt: new Date().setHours(11, 0, 0, 0), // Set end time to 11:00 AM
              description: "Concentrate and understand course material effectively.",
            },
            {
              id: 3,
              title: "Lunch Break",
              tag: "Social",
              location: "Cafeteria",
              recurrence: "daily",
              startAt: new Date().setHours(12, 0, 0, 0), // Set start time to 12:00 PM
              endAt: new Date().setHours(13, 0, 0, 0), // Set end time to 1:00 PM
              description: "Recharge and socialize with friends.",
            },
            {
              id: 4,
              title: "Study Session 2",
              tag: "Study",
              location: "Home",
              recurrence: "daily",
              startAt: new Date().setHours(14, 0, 0, 0), // Set start time to 2:00 PM
              endAt: new Date().setHours(16, 0, 0, 0), // Set end time to 4:00 PM
              description: "Continue academic pursuits in a comfortable environment.",
            },
            {
              id: 5,
              title: "Exercise",
              tag: "Exercise",
              location: "Gym",
              recurrence: "daily",
              startAt: new Date().setHours(17, 0, 0, 0), // Set start time to 5:00 PM
              endAt: new Date().setHours(18, 0, 0, 0), // Set end time to 6:00 PM
              description: "Stay active and boost mood with physical activity.",
            },
            {
              id: 6,
              title: "Evening Wind Down",
              tag: "Relaxation",
              location: "Home",
              recurrence: "daily",
              startAt: new Date().setHours(19, 0, 0, 0), // Set start time to 7:00 PM
              endAt: new Date().setHours(20, 0, 0, 0), // Set end time to 8:00 PM
              description: "Relax and unwind before a restful night's sleep.",
            },
            {
              id: 7,
              title: "Review and Planning",
              tag: "Productivity",
              location: "Home",
              recurrence: "daily",
              startAt: new Date().setHours(20, 0, 0, 0), // Set start time to 8:00 PM
              endAt: new Date().setHours(21, 0, 0, 0), // Set end time to 9:00 PM
              description: "Reflect on achievements and plan for the day ahead.",
            }
          ];
        const filterRoutines = routines.slice().filter(routine => selected.some(item => item == routine.id))
        const tags = filterRoutines.map(item => ({_id: new mongoose.Types.ObjectId(), label: item.tag, color: colorGenerator(), owner: req.user._id}))
        const createdTags = await tagModel.create(tags)
        const createableRoutines = filterRoutines.map(routine => {
            const tag = routine.tag
            delete routine.tag;
            delete routine.id;
            return {_id: new mongoose.Types.ObjectId(), user: req.user, ...routine, tags: [createdTags.find(item => item.label == tag)]}
        })
        const schedules = await scheduleModel.create(createableRoutines)
        res.status(200).send({message: 'Successfully created', schedules, filterRoutines, routines, selected})
    } catch (error) {
        console.log(error)
        res.status(500).send('Something, wrong with ' + req.url)
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
            reminder,
            finished,
            link,
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
            reminder,
            finished,
            link,
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