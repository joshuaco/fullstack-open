const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const blogs = require('../mocks/blogs');
const app = require('../app');

const api = supertest(app);

describe('test bloglist api', () => {
  beforeEach(async () => {
    const deletedCount = await Blog.deleteMany({});
    console.log('deleted ', deletedCount);

    let blogObject = new Blog(blogs[0]);
    await blogObject.save();
    console.log('new blog saved');
    blogObject = new Blog(blogs[1]);
    await blogObject.save();
    console.log('another new blog saved');
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
});

after(async () => {
  console.log('close connection');
  await mongoose.connection.close();
});
