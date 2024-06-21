import { useState } from 'react';

/* eslint-disable react/prop-types */
function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: false
    };

    createNote(noteObject);
    setNewNote('');
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="write note content here"
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
