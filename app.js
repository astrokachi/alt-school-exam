require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blogs');
require('./middleware/authentication');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');
const localServer = 'mongodb://localhost:27017/blog';

const PORT = 3000;
app.use(express.json());

app.use('/auth', authRouter);
app.use('/blogs', blogRouter);

app.get('/', (req, res) => {
  res.send('Welcome home');
});

app.use((req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.use(errorHandler);

async function start() {
  await mongoose.connect(localServer);

  mongoose.connection.on('connected', () => {
    console.log('Mongo db has been connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log('An error has occured in the mongo server', err);
  });

  app.listen(PORT, () => {
    console.log('server is listening on port', PORT);
  });
}

start();
