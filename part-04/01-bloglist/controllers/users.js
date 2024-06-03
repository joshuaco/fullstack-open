const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1
  });
  response.json(users);
});

usersRouter.get('/:username', async (request, response) => {
  const user = await User.findOne({
    username: request.params.username
  }).populate('blogs', {
    title: 1,
    author: 1,
    url: 1
  });
  response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 8) {
    return response
      .status(400)
      .json({ error: 'password must be at least 8 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
