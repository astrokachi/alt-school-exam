require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blogs');
require('./middleware/authentication');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

////////////////////////////////////////////// 0.041667d /////////////////////////////////////////////////////////////
app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.get('/', (req, res) => {
  res.send('Welcome home');
});

app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.use(errorHandler);

module.exports = app