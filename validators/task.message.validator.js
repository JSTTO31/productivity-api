const {check, validationResult} = require('express-validator')
const projectValidator = require('./project.validator')
const messageModel = require('../models/message.model')

async function injectMessage(req, res, next){
    const message = await messageModel.findOne({messageableId: req.task._id, type: 'task', _id: req.params.messageId}).populate('from')
    if(!message){
        console.log("Message is not exists")
        return res.status(401).send('Unauthorize')
    }   

    req.message = message

    return next()
}

async function alreadyRemove(req, res, next){
    console.log(req.message.removedBy);
    if(req.message.removedBy.some(item => item == req.user.id)){
        console.log('Message already remove!')
        return res.status(401).send('Unauthorize')
    }

    return next()
}


const create = [
    projectValidator.addRoles,
    check("text").notEmpty().withMessage("The field is required!"),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]

const remove = [
    projectValidator.addRoles,
    injectMessage,
    alreadyRemove,
]

const unsent = [
    projectValidator.addRoles,
    injectMessage,
    shouldBeOwner,
    alreadyUnsent,
]

const getAll = [
    projectValidator.addRoles,
]


module.exports = {create, remove, unsent, getAll}