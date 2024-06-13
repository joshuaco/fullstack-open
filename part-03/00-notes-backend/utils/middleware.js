const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(
    getTokenFrom(request),
    process.env.JWT_SECRET
  );

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const { username, id } = decodedToken;
  const decodedUser = { username, id };

  request.user = decodedUser;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error collection')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'missing or invalid token' });
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler
};
