const express = require('express');
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, async (req, res) => {
    try {
        const { type, startTime, endTime } = req.body;
        const userId = req.user.id;

        const newActivity = new Activity({
            user: userId,
            type,
            startTime,
            endTime
        });

        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const { start, end } = req.query; 
        const userId = req.user.id;

        const activities = await Activity.find({
            user: userId,
            startTime: { $gte: new Date(start) },
            endTime: { $lte: new Date(end) }
        });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const activityId = req.params.id;
        const userId = req.user.id;

        const activity = await Activity.findOne({ _id: activityId, user: userId });
        if (!activity) {
            return res.status(404).json({ msg: 'Activity not found' });
        }

        await Activity.findByIdAndDelete(activityId);
        res.json({ msg: 'Activity deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { type, startTime, endTime } = req.body;
        const activityId = req.params.id;
        const userId = req.user.id;

        const activity = await Activity.findOne({ _id: activityId, user: userId });
        if (!activity) {
            return res.status(404).json({ msg: 'Activity not found' });
        }

        activity.type = type;
        activity.startTime = new Date(startTime);
        activity.endTime = new Date(endTime);

        await activity.save();
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
