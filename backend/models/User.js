const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: false },
    email: { type: String, unique: true, sparse: true },
});

module.exports = mongoose.model('User', userSchema);