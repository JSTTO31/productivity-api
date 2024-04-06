const { default: mongoose } = require('mongoose')
const authMiddleware = require('../middlewares/auth.middleware.js')
const TimeSpentModel = require('../models/timespent.model.js')
const router = require('express').Router()

router.use(authMiddleware)

router.get('', async (req, res) => {
    try {
        const today = new Date()
        today.setHours(0,0,0,0)
        let timespents = await TimeSpentModel.aggregate([{$match: {user: req.user._id}}, {$group: {_id: null, total: {$sum: '$spent'}}}])
        let total = timespents[0] ? timespents[0].total : 0
        let todayTimeSpent = await TimeSpentModel.findOne({user: req.user, createdAt: {$gte: today}})

        if(!todayTimeSpent){
            todayTimeSpent = await TimeSpentModel.create({
                _id: new mongoose.Types.ObjectId(),
                user: req.user,
                spent: 0
            })
        }
        
        res.status(200).send({total, todayTimeSpent})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

router.put('/:timespentId', async (req, res) => {
    try {
        const timespent = await TimeSpentModel.findOneAndUpdate({user: req.user._id, _id: req.params.timespentId, }, {spent: req.body.spent}, {new: true})
        res.send({timespent})
    } catch (error) {
        res.status(500).send({error})
    }
})


module.exports = router