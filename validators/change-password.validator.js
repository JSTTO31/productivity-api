const {validationResult, check} = require('express-validator')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

async function verifyPassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword)
}

const validator = [
    check('currentPassword').notEmpty().withMessage('The field is required!')
    .custom(async (value, {req}) => {
        const user = await userModel.findOne({_id: req.user._id})
        if(!user.password) return

        if(!await verifyPassword(value, user.password)){
            throw new Error('The current password is not match!')
        }
    }) 
    .escape(),
    check('newPassword').notEmpty().withMessage('The field is required!')
    .custom(async (value, {req}) => {
        if(value.length < 8){
            throw new Error('The field must be atleast 8 letters')
        }
    }) 
    .escape(),
    check('confirmPassword').notEmpty().withMessage('The field is required!').custom(async (value, {req}) => {
        if(value != req.body.newPassword){
           throw new Error("The password confirmation must equal to password!") 
        }
    })
    .escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator