const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const path = require('path');
const morgan = require("morgan");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

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
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;