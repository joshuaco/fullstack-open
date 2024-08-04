import { Routes, Route, useMatch, Navigate } from 'react-router-dom';
import { notes as initialNotes } from './mocks/notes';
import { Alert, Container } from '@mui/material';
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
  const [message, setMessage] = useState('');

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === +match.params.id)
    : null;

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Container>
      <NavBar user={user} />

      {message && <Alert severity="success">{message}</Alert>}

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
    </Container>
  );
}

export default App;
