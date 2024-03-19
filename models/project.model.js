const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    role: {
        type: String,
        enum: ['admin', 'member', 'owner']
    },
}, {timestamps: true})


const SectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: [],
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
    messages: []
})

module.exports = mongoose.model('Project',ProjectSchema)
    