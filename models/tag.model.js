const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    _id: Schema.Types.ObjectId,
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#999',
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    default: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

module.exports = mongoose.model('Tag', TagSchema)