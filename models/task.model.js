const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: String,
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
    },
    status: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignee: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)
