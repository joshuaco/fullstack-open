import { useState, useEffect } from 'react';
import { updateNote, getNotes, createNote, deleteNote } from './services';
import Note from './components/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };

    fetchData();
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((note) => note.id === id);

    const changedNote = {
      ...note,
      important: !note.important
    };

    const response = await updateNote(changedNote.id, changedNote);
    setNotes(notes.map((note) => (note.id !== id ? note : response)));
  };

  const addNote = async (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    };

    const noteWithID = await createNote(noteObject);

    setNotes(notes.concat(noteWithID));
    setNewNote('');
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const removeNote = async (id) => {
    const response = await deleteNote(id);

    if (response.status === 200) {
      setNotes(notes.filter((note) => note.id !== id));
    }
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
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              onDelete={() => removeNote(note.id)}
            />
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
