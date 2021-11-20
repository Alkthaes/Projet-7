const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');
const morgan = require("morgan");

const userRoutes = require('./routes/user');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
const app = express();

dotenv.config();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/api/auth', userRoutes);


module.exports = app;