const { test, describe, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const Note = require('../models/Note');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('When there are notes in db', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });
});

describe('viewing a sspecific note', () => {
  test('succeds with valid ID', async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToView = notesAtStart[0];

    const resultNote = await api.get(`/api/notes/${noteToView.id}`).expect(200);

    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  test('fails with status code 404 if note does not exists', async () => {
    const validNonExistingID = await helper.nonExistingID();

    await api.get(`/api/notes/${validNonExistingID}`).expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe('addition of a new note to db', () => {
  test('note without content is not added', async () => {
    const newNote = {
      important: true
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const response = await helper.notesInDB();

    assert.strictEqual(response.length, helper.initialNotes.length);
  });

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

    const response = await helper.notesInDB();

    assert.strictEqual(response.length, helper.initialNotes.length + 1);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDB();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDB();

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);

    const contents = notesAtEnd.map((r) => r.content);
    assert(!contents.includes(noteToDelete.content));
  });
});

after(async () => {
  await mongoose.connection.close();
});
