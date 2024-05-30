const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/Blog');
const blogs = require('../mocks/blogs');
const app = require('../app');

const api = supertest(app);

describe('test bloglist api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(blogs[0]);
    await blogObject.save();

    blogObject = new Blog(blogs[1]);
    await blogObject.save();
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, 2);
  });

  test('there is a blog whose title contains the word "React"', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);
    assert(titles.includes('React patterns'));
  });

  test('a valid post can be added', async () => {
    const newBlog = blogs[3];

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, 3);
    assert(titles.includes('First class tests'));
  });

  test("blog without title won't be added", async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 0
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, 2);
  });

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });

  test('a note can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    const IDs = blogsAtEnd.map((blog) => blog.id);

    assert(!IDs.includes(blogToDelete.id));
    assert.strictEqual(blogsAtEnd.length, 1);
  });
});

after(async () => {
  console.log('close connection');
  await mongoose.connection.close();
});
