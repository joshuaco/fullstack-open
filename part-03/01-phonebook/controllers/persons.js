const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // Sin parametros pasa al siguiente middleware, con parametros pasa al controlador de errores.
      next(error);
    });
});

personsRouter.post('/', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    });
  } else if (!body.number) {
    return response.status(400).json({
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
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const { id } = request.params;

  const person = {
    number: body.number
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
