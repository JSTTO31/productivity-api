const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PreferenceSchema = new Schema({
    background: {
        type: Number,
        default: 0
    },
    color: {
        type: Number,
        default: 0
    }
})


const UserSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    googleId: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
    },
    password: {
        type: String,
        min: [8, 'The password must be atleast 8 characters!']
    },
    picture: String,
    preference: PreferenceSchema
}, {timestamps: true})


UserSchema.path('email').validate(async (value) => {
    const count = await mongoose.models.User.countDocuments({email: value})
    return !count
}, 'Email already exists!')



module.exports = mongoose.model('User', UserSchema)