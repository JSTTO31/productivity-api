const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoomModel = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    type: {
        type: String,
        default: 'private',
        enum: ['public', 'private']
    }
}, {timestamps: true})




module.exports = mongoose.model('Room', RoomModel)