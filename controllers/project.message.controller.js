const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware.js')
const messageModel = require('../models/message.model.js')
const messageValidator = require('../validators/project.message.validator.js')
const router = require('express').Router()

router.use(authMiddleware)

router.get('/:projectId/messages', messageValidator.getAll, async (req, res) => {
    try {
        const project = req.project;
        const messages = await messageModel.find({project: project._id, removedBy: {$ne: req.user.id}}).populate('from')

        res.status(200).send({messages})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.post('/:projectId/messages', messageValidator.create, async (req, res) => {
    try {
        const {text} = req.body
        const message = new messageModel({
            _id: new mongoose.Types.ObjectId(),
            from: req.user,
            project: req.project,
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

router.put('/:projectId/messages/:messageId/remove',  messageValidator.remove, async (req, res) => {
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


router.put('/:projectId/messages/:messageId/unsent',  messageValidator.unsent, async (req, res) => {
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

router.delete('/:projectId/truncate/messages', async (req, res) => {
    await messageModel.deleteMany({project: req.params.projectId})
    res.status(200).send('deleted')
})

module.exports = router