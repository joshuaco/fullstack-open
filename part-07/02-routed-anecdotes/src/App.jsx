import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { anecdotes as initialState } from './mocks/anecdotes';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Anecdote from './components/Anecdote';

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialState);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote '${anecdote.content}' created!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      {notification && <p>{notification}</p>}

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
