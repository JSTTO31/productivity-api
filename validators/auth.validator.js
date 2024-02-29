const {validationResult, matchedData, check} = require('express-validator')

const validator = [
    check('email').notEmpty().withMessage('The field is required!').isEmail().withMessage('The field must be email!').escape(),
    check('password').notEmpty().withMessage('The field is required!').escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator