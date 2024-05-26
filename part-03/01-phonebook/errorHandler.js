const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  } else {
    response.status(500).end();
  }

  next(error);
};

module.exports = errorHandler;
