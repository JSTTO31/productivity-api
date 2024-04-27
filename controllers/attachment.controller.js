const authMiddleware = require('../middlewares/auth.middleware.js')
const router = require('express').Router()
const taskAttachmentValidator = require('../validators/task-attachement.validator.js')
router.use(authMiddleware)

router.post('/projects/:projectId/sections/:sectionId/tasks/:taskId/attachments', taskAttachmentValidator.create, async (req, res, next) => {
    if(!req.file) return res.status(401).send("Unauthorize")
    const link  = req.headers.host + '/attachments/' + req.file.filename
    req.task.attachments.push({...req.file, link, author: req.user})
    await req.project.save()
    res.send({project: req.project})
})


module.exports = router