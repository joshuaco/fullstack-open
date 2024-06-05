import { useState } from 'react';
import { notes as initialNotes } from './mocks/notes';
import Note from './components/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Notes</h1>

        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>

        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>

        <form onSubmit={addNote}>
          <input type="text" value={newNote} onChange={handleNoteChange} />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </>
  );
}

export default App;