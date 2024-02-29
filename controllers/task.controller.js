const express = require('express')
const Task = require('../models/task.model')
const passport = require('passport')
const taskValidator = require('../validators/task.validator')
const mongoose = require('mongoose')
const router = express.Router()

router.get('', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const tasks = await Task.find({assignee: req.user._id}).exec()
        res.status(200).send({
            tasks
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

router.get('/:taskId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const task = await Task.findOne({assignee: req.user._id, _id: req.params.taskId}).exec()
        res.status(200).send({
            task
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


router.post('', passport.authenticate('jwt', {session: false}), taskValidator, async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            status,
            dueDate,
        } = req.body

        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            priority,
            status,
            dueDate,
            assignee: req.user._id
        })

        await task.save()

        res.status(200).send({
            task
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

router.put('/:taskId', passport.authenticate('jwt', {session: false}), taskValidator, async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            status,
            dueDate,
        } = req.body

        const task = await Task.findOneAndUpdate({_id: req.params.taskId}, {
            title,
            description,
            priority,
            status,
            dueDate,
        }, {new: true})

        res.status(200).send({
            task
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


router.delete('/:taskId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.taskId, assignee: req.user._id})
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
        await Task.deleteMany()
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