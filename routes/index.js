const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const TagController = require('../controllers/tag.controller')
const ScheduleController = require('../controllers/schedule.controller')
const ProjectController = require('../controllers/project.controller')
const ProjectMemberController = require('../controllers/project.member.controller')
const ProjectMessageController = require('../controllers/project.message.controller')
const GoogleAuthController = require('../controllers/google-auth.controller')
const { default: mongoose } = require('mongoose')

router.use('/api/', AuthController)
router.use('/api/projects', ProjectController)
router.use('/api/projects', ProjectMemberController)
router.use('/api/projects', ProjectMessageController)
router.use('/api/schedules', ScheduleController)
router.use('/api/tags', TagController)
router.use('', GoogleAuthController)


router.get('/api/users', async  (req, res) => {
    const filter = {}

    if(req.query.excepts){
        console.log(s);
    }

    const users = await mongoose.model('User').find(filter).limit(5)
    res.status(200).send({users})
})


module.exports = router