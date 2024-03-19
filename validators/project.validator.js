const {validationResult, matchedData, check} = require('express-validator')
const userModel = require('../models/user.model')
const projectModel = require('../models/project.model')


async function addRoles(req, res, next){
    const project = await projectModel.findOne({_id: req.params.projectId, 'members.user': req.user._id}).populate('members.user')
    if(!project){
        console.log('should member');
        return res.status(401).send('Unauthorize')
    }
    const projectRole = project.members.find(item => item.user._id == req.user.id).role
    req.projectRole = projectRole
    req.project = project;
    return next()
}

async function shouldBeOwner(req, res, next){
    if(!req.projectRole || req.projectRole != 'owner'){
        console.log('should owner');
        return res.status(401).send('Unauthorize')
    }

    return next()
}

async function shoudNotBeOwner(req, res, next){
    if(!req.projectRole || req.projectRole == 'owner'){
        console.log('should not owner');
        return res.status(401).send('Unauthorize')
    }

    return next()
}

async function shouldBeAdmin(req, res, next){
    if(!req.projectRole || req.projectRole == 'member'){
        console.log('should admin');
        return res.status(401).send('Unauthorize')
    }
    return next()
}

const create = [
    check('title').notEmpty().withMessage('The field is required!').escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next()
]

const edit = [
    addRoles, 
    shouldBeAdmin,
    check('title').notEmpty().withMessage('The field is required!').escape(),
    check('starred').isBoolean().optional(),
    check('sections').isArray().withMessage('The field is must be array!'),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next(),
    check('sections.*.title').notEmpty().withMessage('The field is required!'),
    check('sections.*.order').notEmpty().withMessage('The field is required!'), 
]

const addMember = [
    addRoles,
    shouldBeAdmin,
    check('members')
    .notEmpty().withMessage('The field is required!')
    .isArray().withMessage("The field must be an array!")
    // not exists in our records
    .custom(async (members, {req}) => {
        if(members.length < 1){
            throw new Error('The field must have atleast one!')
        }

        const users = await userModel.find({email: {$in: members}})
        
        if(users.length != members.length){
            const findNotExists = members.find(item => !users.some(user => user.email == item))
            throw new Error(findNotExists + ' email is not exists in our records')
        }
    })
    // exists in members
    .custom(async (members, {req}) => {
        const currentMembers = req.project.members
        const findExists = currentMembers.find(item => members.some(email => item.user.email == email))
     
        if(findExists){
            throw new Error(findExists.user.email + ' is already a member.')
        }
    })
    .escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next()
]

const editRole = [
    addRoles, 
    shouldBeOwner,
    check('role').notEmpty().withMessage('The field is required!').custom(async value => {
        const roles = ['admin', 'member'];
        if(!roles.some(item => item == value)){
            throw new Error('The filed is invalid role!')
        }
    }).escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next()
]

const leave = [
    addRoles, 
    shoudNotBeOwner, 
]

module.exports = {create, edit, addMember, editRole, leave, shouldBeAdmin, shouldBeOwner, addRoles, shoudNotBeOwner}