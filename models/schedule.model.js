const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: true,
    },
    location: String,
    // attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    finished: {
        type: Boolean,
        default: false,
    },
    recurrence: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'none'],
        default: 'none'
    },
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    reminder: {
        type: String,
        default: '5 minutes before'
    },
    startAt: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
    link: String,
}, {timestamps: true})



module.exports = mongoose.model('Schedule', scheduleSchema)
