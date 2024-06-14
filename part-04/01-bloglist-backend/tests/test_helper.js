const blogs = require('../mocks/blogs');
const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogs = [blogs[0], blogs[1]];

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

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, nonExistingID, blogsInDB, usersInDB };
