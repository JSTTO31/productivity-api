const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    messageableId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    type: {
        required: true,
        type: String,
        enum: ['task', 'project']
    },
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
    },
    removedBy: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    unsent: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})


module.exports = mongoose.model('Message', MessageSchema)
