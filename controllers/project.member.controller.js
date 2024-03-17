const authMiddleware = require('../middlewares/auth.middleware.js')
const projectMemberValidator = require('../validators/project.member.validator.js')
const projectValidator = require('../validators/project.validator.js')
const userModel = require('../models/user.model.js')
const { default: mongoose } = require('mongoose')
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

router.put('/:projectId/members/edit/roles', projectMemberValidator.editRoles,  async(req, res) => {
    try {
        const {members} = req.body;
        const project = req.project
        const isOwner = members.some(item => project.members.find(member => member._id == item._id).role == 'owner')
        if(isOwner){
            console.log("Owner is not role is not editable")
            return res.status(401).send('Unauthorize')
        }

        project.members = project.members.map(item => ({...item, role: members.find((member, index) => {
            const exists = member._id == item._id
            if(exists){
                members.splice(index, 1)
            }
            return exists
        })?.role || item.role}))



        await project.save()

        res.status(200).send({project})
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

router.get('/:projectId/find/members', projectValidator.addRoles, async (req, res) => {
    if(!req.query.email){
        return res.send({users: []})
    }

    const members = req.project.members.map(item => item.user)

    const users = await mongoose.model('User').find({email: {$regex: `.*${req.query.email}.*`, $options: 'i'}, _id: {$nin: members}}).limit(5)
    res.status(200).send({users})
    
})



module.exports = router