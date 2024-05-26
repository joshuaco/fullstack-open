const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else {
    response.status(500).end();
  }

  next(error);
};

module.exports = errorHandler;
