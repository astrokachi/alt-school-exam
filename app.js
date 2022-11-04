require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blogs');
require('./middleware/authentication');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');

const PORT = 3000;
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

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log('server is listening on port', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
