require('express-async-errors');
const { connect } = require('./database/mongo');
const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const blogRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middlewares');
const Blog = require('./models/Blog');
const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static('dist'));
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.get('/info', (request, response) => {
  Blog.countDocuments().then((count) => {
    response.send(
      `<p>Bloglist has info for ${count} blogs</p>
      <p>${new Date().toString()}</p>`
    );
  });
});

app.use(middleware.handleError);
app.use(middleware.unknownEndpoint);

module.exports = app;
