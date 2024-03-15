const {check, validationResult} = require('express-validator')
const projectValidator = require('./project.validator')

async function injectMessage(req, res, next){
    const message = await req.project.messages.id(req.params.messageId)
    if(!message){
        console.log("Message is not exists")
        return res.status(401).send('Unauthorize')
    }   

    req.message = message

    return next()
}

async function alreadyRemove(req, res, next){
    if(req.message.removeBy.some(item => item == req.user.id)){
        console.log('Message already remove!')
        return res.status(401).send('Unauthorize')
    }

    return next()
}

async function shouldBeOwner(req, res, next){
    if(req.message.from != req.user.id){
        console.log('Should be the owner!')
        return res.status(401).send('Unauthorize')
    }

    return next()
}

async function alreadyUnsent(req, res, next){
    if(req.message.unsent){
        console.log('Message already unsent')
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


module.exports = {create, remove, unsent}