const authMiddleware = require('../middlewares/auth.middleware.js')
const projectMemberValidator = require('../validators/project.member.validator.js')
const userModel = require('../models/user.model.js')
const router = require('express').Router()

router.use(authMiddleware)


router.post('/:projectId/members', ...projectMemberValidator.addMember, async (req, res) => {
    try {
        const {members} = req.body
        const users = await userModel.find({email: {$in: members.map(item => item.email)}})
        const project = req.project
        users.forEach(item => {
            const member = members.find(member => member.email == item.email)
            project.members.push({user: item, role: member.role})
        })
        await project.save()
        res.send({
            project
        })
    } catch (error) {
        res.status(500).send({error})
    }
})

router.put('/:projectId/members/:memberId', projectMemberValidator.editRole, async (req, res) => {
    try {
        const {role} = req.body
        const project = req.project
        const member = project.members.find(item => item._id == req.params.memberId)
        if(!member){
            console.log("member is not exists")
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

router.delete('/:projectId/members/:memberId', projectMemberValidator.removeMember, async (req, res) => {
    try {
        const project = req.project
        const member = project.members.find(item => item._id == req.params.memberId)

        if(!member){
            console.log('Member is not exists');
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