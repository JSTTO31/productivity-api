const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    role: {
        type: String,
        enum: ['admin', 'member', 'owner']
    },
}, {timestamps: true})

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    messages: [],
    assignees: [{type: mongoose.Types.ObjectId, ref: 'User'}],

})

const SectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: [TaskSchema],
    order: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

const ProjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    sections: [SectionSchema],
    members: [MemberSchema],
    messages: [],
    watchBy: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Project',ProjectSchema)
    