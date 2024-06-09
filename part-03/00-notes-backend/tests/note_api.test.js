const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const initialNotes = require('../mocks/notes');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.create(initialNotes);
});

describe('When there are notes in db', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are three notes', async () => {
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, initialNotes.length);
  });
});

describe('Sending notes to db', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: false
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/notes');

    assert.strictEqual(response.body.length, initialNotes.length + 1);
  });

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const response = await api.get('/api/notes');

    assert.strictEqual(response.body.length, initialNotes.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
