import { Routes, Route, Link, useMatch } from 'react-router-dom';
import { notes as initialNotes } from './mocks/notes';
import { useState } from 'react';
import Note from './components/Note';
import Notes from './components/Notes';
import Users from './components/Users';
import Login from './components/Login';
import './App.css';
import { Navigate } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Routed Notes App</h2>
  </div>
);

function App() {
  const [notes] = useState(initialNotes);
  const [user, setUser] = useState(null);

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === +match.params.id)
    : null;

  const padding = {
    padding: 5
  };

  const login = (user) => {
    setUser(user);
  };

  return (
    <div>
      <header>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em style={padding}>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </header>

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
