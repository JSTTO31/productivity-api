const router = require('express').Router()
const passport = require('passport')
const RoomModel = require('../models/room.model')

router.get('/room', async (req, res) => {
    try {
        const rooms = await RoomModel.find({owner: req.user._id})
        res.status(200).send({
            rooms
        })
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/room/:roomId', async (req, res) => {
    try {
        const rooms = await RoomModel.find({
            _id: req.params.roomId,
            user: req.user._id
        })
        res.status(200).send({
            rooms
        })
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/room', async (req, res) => {
    try {
        // const response = new 
    } catch (error) {
        
    }
})


module.exports = router