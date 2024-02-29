const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const RoomController = require('../controllers/room.controller')
const TagController = require('../controllers/tag.controller')
const ScheduleController = require('../controllers/schedule.controller')
const TaskController = require('../controllers/task.controller')
const { default: mongoose } = require('mongoose')

router.use('/api/room', RoomController)
router.use('/api/', AuthController)
router.use('/api/schedules', ScheduleController)
router.use('/api/tags', TagController)
router.use('/api/tasks', TaskController)

router.get('/api/users', async  (req, res) => {
    const users = await mongoose.model('User').find({})
    res.status(200).send({users})
})


module.exports = router