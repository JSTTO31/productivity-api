const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: String,
    location: String,
    attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    pinned: {
        type: Boolean,
        default: false
    },
    recurrence: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'none'],
        default: 'none'
    },
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    reminder: String,
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    },
    startAt: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Schedule', scheduleSchema)
