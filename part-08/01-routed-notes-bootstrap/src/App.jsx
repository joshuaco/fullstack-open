import { Routes, Route, useMatch, Navigate } from 'react-router-dom';
import { notes as initialNotes } from './mocks/notes';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import Note from './components/Note';
import Notes from './components/Notes';
import Users from './components/Users';
import Login from './components/Login';
import NavBar from './components/NavBar';

const Home = () => (
  <div>
    <h2>Routed Notes App</h2>
  </div>
);

function App() {
  const [notes] = useState(initialNotes);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === +match.params.id)
    : null;

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <div className="container">
      <NavBar user={user} />

      {message && <Alert variant="success">{message}</Alert>}

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/users"
          element={
            user ? <Users notes={notes} /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </div>
  );
}

export default App;
