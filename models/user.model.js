const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
    background: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: 'light'
    },
})

const SoundsSchema = new Schema({
    all: {
        label: {
            type: String,
            default: 'All Sound',
        },
        value: {
            type: Number,
            default: 100
        }
    },
    theme: {
        label: {
            type: String,
            default: 'Theme sound',
        },
        value: {
            type: Number,
            default: 50
        }
    },
    clock: {
        label: {
            type: String,
            default: 'Clock sound',
        },
        value: {
            type: Number,
            default: 100
        }
    },
    alarm: {
        label: {
            type: String,
            default: 'Alarm noise',
        },
        value: {
            type: Number,
            default: 100
        }
    },
    celebration: {
        label: {
            type: String,
            default: 'Celebration sound',
        },
        value: {
            type: Number,
            default: 100
        }
    },
})

const NotificationSchema = new Schema({
        all: {
            label: String,
            value: {
                type: Boolean,
                default: false
            }
        },
        dailySpend: {
            label: String,
            value: {
                type: Boolean,
                default: true
            }
        },
        timeBreak: {
            label: String,
            value: {
                type: Boolean,
                default: true
            }
        },
        projectTaskNotification: {
            label: String,
            value: {
                type: Boolean,
                default: true
            }
        },
        scheduleUpdates: {
            label: String,
            value: {
                type: Boolean,
                default: true
            }
        },
})

const PreferenceSchema = new Schema({
    theme: ThemeSchema,
    hideBar: {
        type: Boolean,
        default: false
    },
    sounds: SoundsSchema,
    notifications: NotificationSchema
})

const GuideSchema = new Schema({
    tips: {type: Boolean, default: false},
    home: {type: Boolean, default: false},
    project: {type: Boolean, default: false},
    schedule: {type: Boolean, default: false},
    performance: {type: Boolean, default: false},
})

const session = new Schema({
    sessionId: String,
    ua: String,
    browser: Object,
    engine: Object,
    os: Object,
    device: Object,
    cpu: Object,
    current: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

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
    preference: PreferenceSchema,
    setup: {
        type: Boolean,
        default: false,
    },
    sessions: [session],
    guide: GuideSchema,
}, {timestamps: true})


// UserSchema.path('email').validate(async (value) => {
//     const count = await mongoose.models.User.countDocuments({email: value})
//     return !count
// }, 'Email already exists!')



module.exports = mongoose.model('User', UserSchema)