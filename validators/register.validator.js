const {validationResult, matchedData, check} = require('express-validator')
const userModel = require('../models/user.model')

const validator = [
    check('name').notEmpty().withMessage('The field is required!').escape(),
    check('email').notEmpty().withMessage('The field is required!').isEmail().withMessage('The field must be email!').custom(async email => {
        const user = await userModel.findOne({email})
        if(user){
            throw new Error("The email is already taken!")
        }
    }).escape(),
    check('password').notEmpty().withMessage('The field is required!').escape(),
    check('password_confirmation').notEmpty().withMessage('The field is required!').custom(async (password_confirmation, {req}) => {
        if(password_confirmation != req.body.password){
           throw new Error("The password confirmation must equal to password!") 
        }
    }).escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator