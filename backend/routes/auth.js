const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

const auth = require('../middleware/auth');

const router = express.Router();

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('431690577384-silgugp7b00o8eu0gn390m89vs85gtql.apps.googleusercontent.com');

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

router.post('/google-login', async (req, res) => {
    const { tokenId } = req.body;

    const response = await client.verifyIdToken({ idToken: tokenId, audience: '431690577384-silgugp7b00o8eu0gn390m89vs85gtql.apps.googleusercontent.com' });
    const { email_verified, name, email } = response.getPayload();

    if (email_verified) {
        let user = await User.findOne({ email });
        let isNewUser = false;

        if (!user) {
            // Create a new user if not exist
            user = new User({ username: name, email, password: bcrypt.hashSync('your-random-password', 10) });
            await user.save();
            isNewUser = true; 
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, jwtSecret);
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                isNewUser, 
                birthday: user.birthday || null // Return null if birthday is not set
            } 
        });
    } else {
        // Handle the case where the email is not verified
        res.status(401).send('Email not verified');
    }
});

router.put('/update-birthday', auth, async (req, res) => {
    try {
        const { birthday } = req.body;
        const user = await User.findById(req.user._id);
        user.birthday = new Date(birthday);
        console.log(user)
        await user.save();

        res.json({ message: 'Birthday updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

