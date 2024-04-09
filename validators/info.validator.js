const {validationResult, check} = require('express-validator')
const userModel = require('../models/user.model')

const validator = [
    check('name').notEmpty().withMessage('The field is required!').escape(),
    check('email').notEmpty().withMessage('The field is required!').isEmail().withMessage('The field must be email!').custom(async (email, {req}) => {
        const user = await userModel.findOne({email, _id: {$ne: req.user._id}})
        if(user){
            throw new Error("The email is already taken!")
        }
    }).escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator