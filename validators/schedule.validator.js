const {validationResult, matchedData, check, body, } = require('express-validator')
const { default: mongoose } = require('mongoose')
const User = require('../models/user.model')
const Tag = require('../models/tag.model')

const validator = [
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
    check('visibility').notEmpty().custom(value => {
        if(value){
            const exists =  ['public', 'private'].some(item => item == value)
            if(!exists){
                throw new Error(message || 'The options not exists')
            }
        }

        return value
    }),
    check('startAt').notEmpty(),
    check('endAt').notEmpty().custom((value, {req}) => {
        const {startAt, endAt} = req.body

        if(new Date(startAt) > new Date(endAt)){
            throw new Error('The end at date should be after the start at date!')
        }

        return value
    }),
    check('attendees').isArray().custom(async (value) => {
        if(value.some(item => !mongoose.isValidObjectId(item))){
            throw new Error('The element should be a valid object id!')
        }else{
            if(value.length > 0){
                const exists = User.find({_id: {$in: value} })
                if(exists.length != value.length){
                    throw new Error('The attendee not exists in records!')
                }
            }

            return value
        }
    }),
    check('tags').isArray().custom(async value => {
        if(value.some(item => !mongoose.isValidObjectId(item))){
            throw new Error('The element should be a valid object id!')
        }else{
            if(value.length > 0){
                const exists = await Tag.find({_id: {$in: value}})
                if(exists.length != value.length){
                    throw new Error('The tag not exists in records!')
                }
            }

            return value
        }
    }),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
   
]


module.exports = validator