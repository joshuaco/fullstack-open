const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const validPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && validPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // Token expires in 60*60 seconds, that means 1 hour.
  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60
  });

  response.status(201).send({ token, username, name: user.name });
});

module.exports = loginRouter;
