const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./errorHandler');
const unknownEndpoint = require('./unknownEndpoint');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// endpoints
app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      // Sin parametros pasa al siguiente middleware, con parametros pasa al controlador de errores.
      next(error);
    });
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'Name is missing'
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'Number is missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const { id } = req.params;

  const person = {
    number: body.number
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  Person.countDocuments().then((count) => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date().toString()}</p>
    `);
  });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
