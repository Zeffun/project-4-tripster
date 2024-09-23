// Imports
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const tripsRouter = require("./controllers/trips.js");

// Setup & Config
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes go here
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);

app.listen(3000, () => {
    console.log('The express app is ready!');
});