require('dotenv').config();
const cors = require('cors');
const express = require('express');
const middleware = require('./utils/middleware');
const Note = require('./models/Note');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

app.get('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const note = await Note.findById(id);

    if (note) {
      response.json(note);
    } else {
      response.statusMessage = 'Note not found';
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/notes', async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

app.put('/api/notes/:id', async (request, response, next) => {
  const body = request.body;

  const note = {
    ...body,
    important: body.important
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
      runValidators: true,
      context: 'query'
    });
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/notes/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const result = await Note.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
