const {validationResult, check, body} = require('express-validator')
const userModel = require('../models/user.model')
const projectValidator = require('./project.validator')


const addMember = [
    projectValidator.addRoles,
    projectValidator.shouldBeAdmin,
    check('members.*.role')
        .notEmpty().withMessage('The role field is required')
        .custom(async (value) => {
            const roles = ['admin', 'member']
            if(!roles.some(item => value == item)){
                throw new Error("The invalid role!")
            }
        }).escape(),
    check('members.*.email') 
        .notEmpty().withMessage('The field is required')
        .isEmail().withMessage("The field must be an email!")
        // not exists in our records
        .custom(async (members, {req}) => {
            if(req.body.members.length < 1){
                throw new Error('The field must have atleast one!')
            }
            const memberEmails = req.body.members.map(item => item.email) 
            const users = await userModel.find({email: {$in: memberEmails}})
            
            if(users.length != req.body.members.length){
                const findNotExists = memberEmails.find(item => !users.some(user => user.email == item))
                throw new Error(findNotExists + ' email is not exists in our records')
            }
        })
        // exists in members
        .custom(async (members, {req}) => {
            if(req.body.members.length < 1){
                throw new Error('The field must have atleast one!')
            }
            const currentMembers = req.project.members
            const findExists = currentMembers.find(item => req.body.members.some(member => item.user.email == member.email))
        
            if(findExists){
                throw new Error(findExists.user.email + ' is already a member.')
            }
        }).escape(),
    check('members')
    .notEmpty().withMessage('The field is required')
    .isArray().withMessage("The field must be an array!")
    .custom(async value => {
        if(value.length < 1){
            throw new Error("The field must have atleast one object!")
        }
    }),
    (req, res, next) => {
        console.log(validationResult(req).array());
        return validationResult(req).array().length > 0 ? res.status(401).send({
            errors: validationResult(req).array(),
        }) : next()
    }
]

const editRole = [
    projectValidator.addRoles, 
    projectValidator.shouldBeOwner,
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

const removeMember = [
    projectValidator.addRoles,
    projectValidator.shouldBeAdmin,
]

module.exports = {addMember, editRole,removeMember}