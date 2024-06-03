const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid user or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // Token expires in 60 * 60 seconds, that means 1 hour.
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
