const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  });
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      response.status(400).send({ error: error.message });
    });
});

blogRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      response.status(400).send({ error: error.message });
    });
});

module.exports = blogRouter;
