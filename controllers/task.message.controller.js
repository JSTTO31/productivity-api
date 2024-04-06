const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware.js')
const messageModel = require('../models/message.model.js')
const messageValidator = require('../validators/project.message.validator.js')
const router = require('express').Router()

router.use(authMiddleware)

router.get(':projectId/tasks/:taskId/messages', messageValidator.getAll, async (req, res) => {
    try {
        const messages = await messageModel.find({messageableId: req.params.taskId, type: 'task', removedBy: {$ne: req.user.id}}).populate('from')

        res.status(200).send({messages})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.post(':projectId/tasks/:taskId/messages', messageValidator.create, async (req, res) => {
    try {
        const {text} = req.body
        const message = new messageModel({
            _id: new mongoose.Types.ObjectId(),
            from: req.user,
            messageableId: req.task._id,
            type: 'task',
            text,
        })

        await message.save()
        await message.populate('from')

        res.send({
            message
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.put(':projectId/tasks/:taskId/messages/:messageId/remove',  messageValidator.remove, async (req, res) => {
    try {
        const message = req.message;
        message.removedBy.push(req.user)
        await message.save()
        res.status(200).send({message})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})


router.put(':projectId/tasks/:taskId/messages/:messageId/unsent',  messageValidator.unsent, async (req, res) => {
    try {
        const message = req.message
        message.unsent = true
        await message.save()

        return res.send({message})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

module.exports = router