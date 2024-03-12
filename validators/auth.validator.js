const {validationResult, matchedData, check} = require('express-validator')
const userModel = require('../models/user.model')

const validator = [
    check('email').notEmpty().withMessage('The field is required!').custom(async email => {
        const user = await userModel.findOne({email: email})
        if(!user){
            throw new Error("The email is not in the records!")
        }
    }).escape(),
    check('password').notEmpty().withMessage('The field is required!').escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next()
]


module.exports = validator