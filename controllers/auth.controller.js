const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const User = require('mongoose').model('User')
const hashedPasswordUtil = require('../utils/hashPassword.util')
const authValidator = require('../validators/auth.validator')
const registerValidator = require('../validators/register.validator')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middleware')
const userModel = require('../models/user.model')
const preference = require('../utils/preference')
const UAParser = require('ua-parser-js')
const sessionModel = require('../models/session.model')



router.get('/check/', authMiddleware, async (req, res) => {
    // const users = await userModel.updateMany({}, {guide})
    // const users = await userModel.updateMany({}, {sessions: []})
    const sessionId = req.sessionID
    const parser = new UAParser()
    const result = parser.setUA(req.headers['user-agent']).getResult()
    const session = {sessionId, ...result, current: true}

    const user = await userModel.findOne({_id: req.user._id})
    user.sessions = user.sessions.map(item => ({...item, current: false}))
    const exists = user.sessions.find(item => item.ua == session.ua)
    
    if(exists){
        exists.updatedAt = new Date()
        exists.current = true
    }else{
        user.sessions.push(session)
    }


    await user.save()

    res.status(200).send({message: 'welcome back user!', user})
})

router.post('/logout/', authMiddleware, (req, res, next) => {
    req.logout((err) => {
        if(err) return next(err)
        res.status(200).send({message: 'Successfully Logout!'})
    })
})

router.post('/login', authValidator, passport.authenticate('local'), async (req, res) => {
    try {
        res.status(200).send({message: 'successfully login!'})
    } catch (error) {
        console.log(error);
        res.status(500).send("Something wrong with " + req.url)
    }
})

router.post('/register', registerValidator, async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await hashedPasswordUtil(password)
        const guide = {
            tips: false,
            home: false,
            project: false,
            schedule: false,
            performance: false,
        }
        
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hashedPassword,
            picture: `https://ui-avatars.com/api/?name=${name}&background=random&color=random`,
            preference,
            guide
        })

        req.login(user, (err) => {
            if(err) return next(err)
            res.status(200).send({message: 'successfully register'})
        })
        
    } catch (error) {
        console.log(error);
        if(!error){
            res.sendStatus(500)
        }else{
            res.status(422).send(error)
        }
    }
}, )


router.post('/remove-other-sessions/:sessionId', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user})
        const currentSession = user.sessions.id(req.params.sessionId)
        const sessionIds = user.sessions.filter(session => session._id != req.params.sessionId).map(session => session.sessionId)
        console.log(sessionIds);
        await sessionModel.deleteMany({_id: {$in: sessionIds}})
        user.sessions = [currentSession]
        await user.save()

        res.status(200).send({user})
    } catch (error) {
        console.log(error);
        res.status(500).send("Something wrong with " + req.url)
    }
})

router.delete('/delete-account', authMiddleware, async (req, res) => {
    try {
        await userModel.deleteOne({_id: req.user._id})
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).send("Something wrong with " + req.url)
    }
})


module.exports = router