const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    _id: String,
    expires: Date,
    session: String
})



module.exports = mongoose.model('Session', SessionSchema)