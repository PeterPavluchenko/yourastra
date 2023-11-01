require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const uri = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(uri)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
