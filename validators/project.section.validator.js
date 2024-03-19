const {check, validationResult} = require('express-validator')
const projectValidator = require('./project.validator')

const create = [
    projectValidator.addRoles,
    check('title').notEmpty().withMessage("The field is required"),
    async (req, res, next) => validationResult(req).array().length > 0 ? res.status(401).send({errors: validationResult(req).array()}) : next()
]

const remove = [
    projectValidator.addRoles
]

module.exports = {create, remove}