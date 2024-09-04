import { useEffect, useState } from 'react';
import { createNote, getAllNotes } from './services/noteService';
import { Note } from './types';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({ content: newNote }).then((data) =>
      setNotes(notes.concat(data))
    );

    setNewNote('');
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          type='text'
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
