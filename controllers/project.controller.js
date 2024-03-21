const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware.js')
const projectModel = require('../models/project.model.js')
const ProjectModel = require('../models/project.model.js')
const projectValidator = require('../validators/project.validator.js')
const userModel = require('../models/user.model.js')
const router = require('express').Router()

router.use(authMiddleware)

router.get('', async (req, res) => {
    try {
        const projects = await ProjectModel.find({'members.user': req.user._id}).populate('members.user')
        res.status(200).send({projects})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.get('/:projectId', projectValidator.addRoles, async (req, res) => {
    try {
        res.status(200).send({project: req.project})
    } catch (error) {
        res.status(500).send({error})
    }
})

router.post('', projectValidator.create, async (req, res) => {
    try {
        const project = new projectModel({_id: new mongoose.Types.ObjectId(), title: req.body.title, owner: req.user._id})
        project.members.push({role: 'owner', user: req.user._id})
        project.sections.push({title: 'To do', order: 1, tasks: []})
        project.sections.push({title: 'In Progress', order: 2, tasks: []})
        project.sections.push({title: 'Completed', order: 3, tasks: []})
        await project.save()
        project.members[0].user = req.user
        res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.put('/:projectId', projectValidator.edit, async (req, res) => {
    try {
        const {sections, title} = req.body
        req.project.title = title
        req.project.sections = sections

        await req.project.save()
        res.status(200).send({project: req.project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.delete('/:projectId', projectValidator.addRoles, projectValidator.shouldBeOwner, async (req, res) => {
    try {
        await ProjectModel.findByIdAndDelete(req.params.projectId)
        res.send(null)
    } catch (error) {
        res.status(500).send({error})
    }
})

router.delete('/:projectId/leave', projectValidator.leave, async (req, res) => {
    try {
        const project = req.project
        project.members = project.members.filter(item => item.user._id != req.user.id)
        await project.save()
        res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})





module.exports = router