const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    role: {
        type: String,
        enum: ['admin', 'member', 'owner']
    },
}, {timestamps: true})

const MessageSchema = new Schema({
    text: {
        required: true,
        type: String,
    },
    from: {type: mongoose.Types.ObjectId, ref: 'User'},
    unsent: {
        type: Boolean,
        default: false,
    },
    removeBy: [{type: Schema.Types.ObjectId}],
}, {timestamps: true})

const ProjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    icon: String,
    starred: {
        type: Boolean,
        default: false
    },
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    members: [MemberSchema],
    messages: [MessageSchema],
})

module.exports = mongoose.model('Project',ProjectSchema)
    