const authMiddleware = require('../middlewares/auth.middleware.js')
const messageValidator = require('../validators/project.message.validator.js')
const userModel = require('../models/user.model.js')
const router = require('express').Router()

router.use(authMiddleware)

router.post('/:projectId/messages', messageValidator.create, async (req, res) => {
    try {
        const {text} = req.body
        req.project.messages.push({
            text, from: req.user.id
        })
   
        await req.project.save()
        
        const message = req.project.messages[req.project.messages.length - 1]

        res.send({
            message
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.put('/:projectId/messages/:messageId/remove',  messageValidator.remove, async (req, res) => {
    try {
        const project = req.project
        req.message.removeBy.push(req.user.id)
        await project.save()

        res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.put('/:projectId/messages/:messageId/unsent',  messageValidator.unsent, async (req, res) => {
    try {
        const project = req.project
        req.message.unsent = true
        await project.save()

        return res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

module.exports = router