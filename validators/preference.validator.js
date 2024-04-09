const {validationResult, matchedData, check} = require('express-validator')
const userModel = require('../models/user.model')

const color = ["system", "light", "dark", "TwilightViolet", "PastelSerenity", "EmeraldShores", "RusticElegance", "MoonlitMist", "IvoryHarmony"]


const validator = [
    check('preference.theme.background').custom(async value => {
        if(typeof value != 'number' || !value ) throw new Error('The field is required')
        if(!(value < 22 && value > -1)) throw new Error('The field value is not exists')
    }),
    check('preference.theme.background').custom(async value => {
        if(!value) throw new Error('The field is required')
        if(!color.some(item => item == value)) throw new Error('The field value is not exists')
    }),
    check('preference.theme').notEmpty().withMessage('The field is required!'),
    check('preference').notEmpty().withMessage('The field is required!'),
    (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({
        errors: validationResult(req).array(),
    }) : next()
]


module.exports = validator