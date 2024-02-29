const {validationResult, matchedData, check, checkSchema} = require('express-validator')

const validator = [
    check('title').notEmpty().withMessage('The field is required!').isString().withMessage('The field should be an alphanumeric'),
    check('priority').notEmpty().custom(value => {
        if(value){
            const exists = ['low', 'medium', 'high', 'very high'].some(item => item == value)
            if(!exists){
                throw new Error('The options not exists')
            }
        }

        return value
    }),
    check('status').notEmpty().withMessage('The field is required!').isString().withMessage('The field should be an alphanumeric'),
    check('dueDate').isDate().isAfter(),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(422).send({errors: validationResult(req).array()}) : next()
]


module.exports = validator