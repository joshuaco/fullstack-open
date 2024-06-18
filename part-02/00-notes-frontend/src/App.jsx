import { useState, useEffect, useRef } from 'react';
import { updateNote, getNotes, deleteNote, createNote } from './services/notes';
import { setToken } from './services/notes';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

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

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    const newNote = await createNote(noteObject);

    setNotes(notes.concat(newNote));
  };

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
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);

      setNotes(notes.filter((note) => note.id !== id));
      setMessage('Note removed');
    } catch (e) {
      setMessage('Error removing note');
    }
    clearMessage();
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <>
      <div>
        <h1>Notes</h1>

        {message && <Notification message={message} />}

        {user === null ? (
          <Togglable buttonLabel="login">
            <LoginForm
              setUser={setUser}
              setMessage={setMessage}
              clearMessage={clearMessage}
            />
          </Togglable>
        ) : (
          <>
            <p>
              {/* Todo: Fix this when came to react-bootstrap */}
              {user.name} logged-in{' '}
              <button onClick={handleLogout}>Logout</button>
            </p>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          </>
        )}

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

        <Footer />
      </div>
    </>
  );
}

export default App;
