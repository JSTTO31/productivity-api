const {validationResult, matchedData, check, checkSchema} = require('express-validator')

const validator = [
    check('label').notEmpty().withMessage('The field is required!').isString().withMessage('The field should be an alphanumeric').escape(),
    check('color').notEmpty().withMessage('The field is required!').isHexColor().withMessage('The field should be a HEX color!').escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator