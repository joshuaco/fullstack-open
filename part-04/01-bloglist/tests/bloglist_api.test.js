const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/Blog');
const blogs = require('../mocks/blogs');
const app = require('../app');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);
    assert(titles.includes('React patterns'));
  });

  test('blogs returned with property id', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      assert(blog.id);
    });
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid ID', async () => {
      const blogsAtStart = await helper.blogsInDB();
      const blogToView = blogsAtStart[1];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    test('fails with statuscode 404 if blog does not exists', async () => {
      const validNonExistingID = await helper.nonExistingID();

      await api.get(`/api/blogs/${validNonExistingID}`).expect(404);
    });

    test('fails with statuscode 400 if ID is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = blogs[3];

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    });

    test('fail with status code 400 if data is invalid', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        likes: 1
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDB();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("set likes default to zero if doesn't exist in petition", async () => {
      const newBlog = blogs[4];

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
    });
  });

  describe('update of blog data', () => {
    test('increase likes', async () => {
      const blogsAtStart = await helper.blogsInDB();
      const blog = blogsAtStart[1];

      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      };

      await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200);

      const blogsAtEnd = await helper.blogsInDB();

      assert.strictEqual(blogsAtEnd[1].likes, blog.likes + 1);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 203 if ID is valid', async () => {
      const blogsAtStart = await helper.blogsInDB();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDB();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
