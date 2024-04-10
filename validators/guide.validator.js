const {validationResult, check} = require('express-validator')

const validator = [
    check('guide.tips').isBoolean().withMessage('The field must be a boolean').escape(),
    check('guide.home').isBoolean().withMessage('The field must be a boolean').escape(),
    check('guide.project').isBoolean().withMessage('The field must be a boolean').escape(),
    check('guide.schedule').isBoolean().withMessage('The field must be a boolean').escape(),
    check('guide.performance').isBoolean().withMessage('The field must be a boolean').escape(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator