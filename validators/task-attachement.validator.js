const userModel = require('../models/user.model')
const {validationResult, matchedData, check, checkSchema} = require('express-validator')
const projectModel = require('../models/project.model')
const multer = require('multer')
const randomAlphanumeric = require('../utils/randomAlphanumeric')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/attachments/')
    },
    filename: (req, file, cb) => {
        const task = req.task
        const split = file.originalname.split('.')
        const extension = split[split.length - 1]
        const name = task._id + randomAlphanumeric() + '.' + extension
        cb(null, name)
    },
    fileFilter: (req, file, cb) => {
        if(!req.file){
            cb(new Error("The file is required!"))
        }

        const megabytes = req.file.size / 1000 / 1000

        if(megabytes > 25){
            cb(new Error('The file exceed its limitation!'))
        }

        const mimetypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'application/vnd.ms-powerpoint', 'application/zip', 'application/x-sql', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if(!mimetypes.some(item => item == req.file.mimetype)){
            cb(new Error('The file is not supported of our application!'));
        }

        cb(null, true)
    },
})
const upload = multer({storage})

async function addRoles(req, res, next){
    console.log('triggered')
    const project = await projectModel.findOne({_id: req.params.projectId, 'members.user': req.user._id})
                    .populate('members.user').populate({
                        path: 'sections',
                        populate: {
                            path: 'tasks',
                            populate: {
                                path: 'notes',
                                populate: {
                                    path: 'from'
                                }
                            }
                        }
                    })
                    .populate('sections.tasks.assignees')
                    .populate('messages.from')

    if(!project){
        console.log('should member');
        return res.status(401).send('Unauthorize')
    }
    const projectRole = project.members.find(item => item.user._id == req.user.id).role
    req.projectRole = projectRole
    req.project = project;
    return next()
}

async function shouldBeAssignee(req, res, next){
    const findSection = req.project.sections.find(section => section._id == req.params.sectionId)
    if(!findSection){
        console.log("can't find section")
        return res.status(401).send("Unauthorize")
    }

    const findTask = findSection.tasks.find(task => task._id == req.params.taskId)
    if(!findTask){
        console.log("Can't find task")
        return res.status(401).send("Unauthorize")
    }
    req.task = findTask
    const isAssignee = findTask.assignees.some(assignee => assignee._id.toString() == req.user._id.toString())
    if(!isAssignee){
        console.log("The current user is not assignee")
        return res.status(401).send('Unauthorize')
    }
    return next()
}


const create = [
    addRoles, 
    shouldBeAssignee,
    upload.single('attachment'),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
]


module.exports = {create}