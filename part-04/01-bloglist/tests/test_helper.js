const blogs = require('../mocks/blogs');
const Blog = require('../models/Blog');

const nonExistingID = async () => {
  const blog = new Blog(blogs[4]);
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { nonExistingID, blogsInDB };
