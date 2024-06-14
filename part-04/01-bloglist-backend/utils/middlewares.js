const jwt = require('jsonwebtoken');
const logger = require('./logger');
const morgan = require('morgan');

morgan.token('body', (req) => JSON.stringify(req.body));

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const getToken = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(getToken(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' });
  }

  const { username, id: userId } = decodedToken;
  const decodedUser = { username, id: userId };

  request.user = decodedUser;
  next();
};

const handleError = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` must be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  userExtractor,
  handleError
};
