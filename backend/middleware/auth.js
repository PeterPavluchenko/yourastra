const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).send({ error: 'User not found.' });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
