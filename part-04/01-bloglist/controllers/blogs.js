const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  const updatedBlog = {
    likes: body.likes
  };

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
  response.status(200).json(updatedBlog);
});

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
