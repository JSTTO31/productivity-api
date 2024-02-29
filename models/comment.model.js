const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchedule = new Schema({
    _id: Schema.Types.ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Comment', commentSchedule)
