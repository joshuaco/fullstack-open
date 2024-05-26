const express = require('express');
const cors = require('cors');
const personsRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.morganLogger);

app.use('/api/persons', personsRouter);

app.get('/info', (req, res) => {
  Person.countDocuments().then((count) => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date().toString()}</p>
    `);
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
