const authMiddleware = require('../middlewares/auth.middleware.js')
const projectValidator = require('../validators/project.validator.js')
const userModel = require('../models/user.model.js')
const router = require('express').Router()

router.use(authMiddleware)


router.post('/:projectId/members', projectValidator.addMember, async (req, res) => {
    try {
        const {members} = req.body
        const users = await userModel.find({email: {$in: members}})
        const project = req.project
        users.forEach(item => project.members.push({user: item, role: 'member'}))
        await project.save()
        res.send({
            project
        })
    } catch (error) {
        res.status(500).send({error})
    }
})

router.put('/:projectId/members/:memberId', projectValidator.editRole, async (req, res) => {
    try {
        const {role} = req.body
        const project = req.project
        const member = project.members.find(item => item._id == req.params.memberId)
        
        if(!member){
            return res.status(401).send('Unauthorize')
        }
        
        member.role = role
        await project.save()

        res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})


router.delete('/:projectId/members/:memberId', projectValidator.addRoles, projectValidator.shouldBeAdmin, async (req, res) => {
    try {
        const project = req.project
        const member = project.members.find(item => item._id == req.params.memberId)

        console.log(member);

        if(!member){
            return res.status(401).send('Unauthorize')
        }

        if(((member.role == 'admin' || member.role == 'owner') && req.projectRole != 'owner')){
            return res.status(401).send('Unauthorize')
        }
        
        member.deleteOne()
        await project.save()

        res.send({project})
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})


module.exports = router