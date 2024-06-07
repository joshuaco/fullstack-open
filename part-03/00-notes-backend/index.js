const express = require('express');
let notes = require('./db');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = +request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = 'Note not found';
    response.status(404).end();
  }
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' });
  }

  const note = {
    id: generateID(),
    content: body.content,
    important: Boolean(body.important) || false
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = +request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
