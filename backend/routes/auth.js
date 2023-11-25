const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, birthday } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) return res.status(400).json({ error: "Username is taken" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            birthday,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, jwtSecret);

        res.json({ token, user: { id: newUser._id, username, birthday } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, jwtSecret);

        res.json({ token, user: { id: user._id, username, birthday: user.birthday } });
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

module.exports = router;

