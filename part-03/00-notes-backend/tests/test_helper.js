const notes = require('../mocks/notes');
const Note = require('../models/Note');

const initialNotes = notes;

const nonExistingID = async () => {
  const note = new Note({ content: 'will remove this soon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDB = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = { initialNotes, nonExistingID, notesInDB };
