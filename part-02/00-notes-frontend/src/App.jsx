import { useState, useEffect } from 'react';
import { updateNote, getNotes, createNote, deleteNote } from './services/notes';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Login from './components/Login';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };

    fetchData();
  }, []);

  if (!notes) {
    return null;
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((note) => note.id === id);

    const changedNote = {
      ...note,
      important: !note.important
    };

    try {
      const response = await updateNote(changedNote.id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : response)));
    } catch (e) {
      console.log(e);
      setMessage(e.response.statusText);
      clearMessage();
      setNotes(notes.filter((note) => note.id !== id));
    }
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

    if (response.status === 204) {
      setNotes(notes.filter((note) => note.id !== id));
      setMessage('Note removed');
      clearMessage();
    }
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      <div>
        <h1>Notes</h1>

        {message && <Notification message={message} />}

        {user === null ? (
          <Login
            setUser={setUser}
            setMessage={setMessage}
            clearMessage={clearMessage}
          />
        ) : (
          <>
            <p>
              {/* Todo: Fix this when came to react-bootstrap */}
              {user.name} logged-in{' '}
              <button onClick={handleLogout}>Logout</button>
            </p>

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

            <NoteForm
              addNote={addNote}
              newNote={newNote}
              handleNoteChange={handleNoteChange}
            />
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default App;
