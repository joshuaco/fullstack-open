const blogRouter = require('express').Router();
const { userExtractor } = require('../utils/middlewares');
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    ...body,
    user: user.id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.put('/:id', userExtractor, async (request, response, next) => {
  const body = request.body;
  const updatedBlog = {
    likes: body.likes
  };

  console.log('Here...');

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
  response.status(200).json(updatedBlog);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (blog === null) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (!blog.user) {
    return response.status(401).json({ error: 'unauthorized' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' });
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }

  response.status(204).end();
});

module.exports = blogRouter;
