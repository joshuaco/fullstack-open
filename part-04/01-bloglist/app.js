const { connect } = require('./database/mongo');
const express = require('express');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const middleware = require('./utils/middlewares');
const Blog = require('./models/Blog');
const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);

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
