require('dotenv').config();

const mongoose = require('mongoose');
const blogs = require('./mocks/blogs');

mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.TEST_MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = {
  title: 'How to be a good programmer',
  author: 'John Kramer',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 0
};

addBlog(blog);

function addBlog(blog) {
  const newBlog = new Blog(blog);

  newBlog
    .save()
    .then((result) => {
      console.log('added blog', result);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

function getAllBlogs() {
  Blog.find({}).then((result) => {
    console.log('all blogs', result);
  });
}

module.exports = { addBlog, getAllBlogs };
