const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const TagController = require('../controllers/tag.controller')
const ScheduleController = require('../controllers/schedule.controller')
const ProjectController = require('../controllers/project.controller')
const TimeSpentController = require('../controllers/timespent.controller')
const ProjectMemberController = require('../controllers/project.member.controller')
const ProjectMessageController = require('../controllers/project.message.controller')
const GoogleAuthController = require('../controllers/google-auth.controller')
const UserController = require('../controllers/user.controller')

router.use('/api/', AuthController)
router.use('/api/projects', ProjectController)
router.use('/api/projects', ProjectMemberController)
router.use('/api/projects', ProjectMessageController)
router.use('/api/schedules', ScheduleController)
router.use('/api/tags', TagController)
router.use('/api/time-spents', TimeSpentController)
router.use('', GoogleAuthController)
router.use('/api/users', UserController)


module.exports = router