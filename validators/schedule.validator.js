const {validationResult, matchedData, check, body, } = require('express-validator')
const { default: mongoose } = require('mongoose')
const User = require('../models/user.model')
const Tag = require('../models/tag.model')
const Schedule = require('../models/schedule.model')


function isOwner(req, res, next){
    const schedule = Schedule.findOne({_id: req.params.scheduleId, user: req.user.id})
    
    if(!schedule){
        console.log('is not owner')
        return res.status(401).send('Unauthorize')
    }

    req.schedule = schedule

    return next()
}

async function customStartDate( value, {req}){
    const startAt = new Date(value)
    const endAt = new Date(req.body.endAt)
    if(startAt > endAt){
        throw new Error('The field must before of end date!')
    }
    const difference = endAt - startAt
    const hours = difference / (1000 * 60 * 60)
    const minutes = difference / (1000 * 60)
    if(hours < 1 && minutes < 15){
        throw new Error('The field must atleast 15 minutes distance!')
    }
}

async function customEndDate( value, {req}){
    const startAt = new Date(req.body.startAt)
    const endAt = new Date(value)
    if(startAt > endAt){
        throw new Error('The field must after of start date!')
    }
    const difference = endAt - startAt
    const hours = difference / (1000 * 60 * 60)
    const minutes = difference / (1000 * 60)
    if(hours < 1 && minutes < 15){
        throw new Error('The field must atleast 30 minutes distance!')
    }
}

const create = [
    check('title').notEmpty().withMessage('The field is required!').isString().withMessage('The field should be an alphanumeric'),
    check('recurrence').notEmpty().custom(value => {
        if(value){
            const exists = ['none', 'daily', 'weekly', 'monthly'].some(item => item == value)
            if(!exists){
                throw new Error(message || 'The options not exists')
            }
        }

        return value
    }),
    check('startAt').notEmpty().withMessage('The field is required').custom(customStartDate),
    check('endAt').notEmpty().custom(customEndDate),
    check('link').custom(async value => {
        if(!value) return
        const regex = new RegExp('^https://meet.google.com|^https://zoom.us/j/')
        if(!regex.test(value)){
            throw new Error('The field must be from gmeet or zoom!')
        }
    }),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
   
]

const edit = [
    isOwner,
    check('title').notEmpty().withMessage('The field is required!').isString().withMessage('The field should be an alphanumeric'),
    check('recurrence').notEmpty().custom(value => {
        if(value){
            const exists = ['none', 'daily', 'weekly', 'monthly'].some(item => item == value)
            if(!exists){
                throw new Error(message || 'The options not exists')
            }
        }

        return value
    }),
    check('link').custom(async value => {
        if(!value) return
        const regex = new RegExp('^https://meet.google.com|^https://zoom.us/j/')
        if(!regex.test(value)){
            throw new Error('The field must be from gmeet or zoom!')
        }
    }),
    check('startAt').notEmpty().withMessage('The field is required').custom(customStartDate),
    check('endAt').notEmpty().custom(customEndDate),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
]

const remove = [
    isOwner
]


module.exports = {edit, create, remove}