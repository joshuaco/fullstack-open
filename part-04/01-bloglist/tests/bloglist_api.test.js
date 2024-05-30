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
    await Blog.insertMany(helper.initialBlogs);
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

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
    assert(titles.includes('First class tests'));
  });

  test("blog without title or url won't be added", async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 0
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => {
      assert(blog.id);
    });
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

  test('blog without likes is default to 0', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    const blogToView = blogsAtEnd[blogsAtEnd.length - 1];

    assert.strictEqual(blogToView.likes, 0);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingID = await helper.nonExistingID();
    console.log(validNonExistingID);
    await api.get(`/api/blogs/${validNonExistingID}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidID = '5a3d5da59070081a82a3445';

    await api.get(`/api/blogs/${invalidID}`).expect(400);
  });

  test('likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    const likes = blogsAtEnd.map((blog) => blog.likes);
    assert.strictEqual(likes[0], blogsAtStart[0].likes + 1);
  });

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[1];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    const IDs = blogsAtEnd.map((blog) => blog.id);

    assert(!IDs.includes(blogToDelete.id));
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });
});

after(async () => {
  console.log('close connection');
  await mongoose.connection.close();
});
