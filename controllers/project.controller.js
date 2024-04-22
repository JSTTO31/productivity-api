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
        const projects = await ProjectModel.find({'members.user': req.user._id})
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

// router.post('', projectValidator.create, async (req, res) => {
//     try {
//         const sampleProject = {
//             _id: req.user,
//             title: "Software Development Project",
//             sections: [
//               {
//                 title: "Backlog",
//                 tasks: [
//                   {
//                     title: "Implement user authentication",
//                     description: "Develop authentication system using JWT",
//                     dueDate: new Date("2024-04-15"),
//                     priority: "high",
//                     notes: [
//                       {
//                         from: req.user,
//                         text: "Discuss authentication flow with team"
//                       },
//                       {
//                         from: req.user,
//                         text: "Research best practices for JWT implementation"
//                       }
//                     ],
//                     assignees: [req.user],
//                     watchBy: [req.user],
//                     completed: false
//                   },
//                   {
//                     title: "Design database schema",
//                     description: "Define database structure for the application",
//                     dueDate: new Date("2024-04-10"),
//                     priority: "medium",
//                     notes: [],
//                     assignees: [req.user],
//                     watchBy: [],
//                     completed: false
//                   },
//                   // Add more tasks if needed
//                 ],
//                 order: 1
//               },
//               {
//                 title: "In Progress",
//                 tasks: [
//                   {
//                     title: "Frontend UI development",
//                     description: "Build responsive user interface using React",
//                     dueDate: new Date("2024-04-30"),
//                     priority: "high",
//                     notes: [
//                       {
//                         from: req.user,
//                         text: "Discuss UI design patterns with UX team"
//                       }
//                     ],
//                     assignees: [req.user],
//                     watchBy: [req.user],
//                     completed: false
//                   },
//                   // Add more tasks if needed
//                 ],
//                 order: 2
//               },
//               {
//                 title: "Testing",
//                 tasks: [
//                   // Add tasks here
//                 ],
//                 order: 3
//               },
//               {
//                 title: "Completed",
//                 tasks: [
//                   {
//                     title: "API documentation",
//                     description: "Write comprehensive API documentation",
//                     dueDate: new Date("2024-04-05"),
//                     priority: "low",
//                     notes: [],
//                     assignees: [req.user],
//                     watchBy: [],
//                     completed: true
//                   },
//                   // Add more tasks if needed
//                 ],
//                 order: 4
//               }
//             ],
//             members: [
//               {
//                 user: req.user,
//                 role: "admin"
//               },
//               {
//                 user: req.user,
//                 role: "member"
//               }
//             ],
//             messages: [
//               {
//                 from: req.user,
//                 text: "Discussion on project timeline and milestones"
//               },
//               {
//                 from: req.user,
//                 text: "Reminder: Team meeting tomorrow at 10 AM"
//               }
//             ]
//           };
//         const project = new projectModel(sampleProject)
//         await project.save()
//         project.members[0].user = req.user
//         res.send({project})
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({error})
//     }
// })

router.put('/:projectId', projectValidator.edit, async (req, res) => {
    try {
        const {sections, title, messages, members} = req.body
        req.project.title = title
        req.project.sections = sections
        req.project.messages = messages
        req.project.members = members

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