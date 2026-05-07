const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.get('/', userRoutes);

module.exports = app;