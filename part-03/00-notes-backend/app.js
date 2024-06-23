const express = require('express');
require('express-async-errors');
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const connectToDB = require('./database/mongo');

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
