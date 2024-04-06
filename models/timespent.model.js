const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TimeSpentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    spent: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('TimeSpent',TimeSpentSchema)
    