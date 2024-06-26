const notesRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Note = require('../models/Note');
const User = require('../models/User');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = 'Note not found';
    response.status(404).end();
  }
});

notesRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const note = {
    ...body,
    important: body.important,
    user: user._id
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query'
  });

  response.json(updatedNote);
});

notesRouter.delete('/:id', userExtractor, async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;
