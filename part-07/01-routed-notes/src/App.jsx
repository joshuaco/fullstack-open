import { useState } from 'react';
import './App.css';

const Home = () => (
  <div>
    <h2>Routed Notes App</h2>
  </div>
);

const Notes = () => (
  <div>
    <h2>Notes</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

function App() {
  const [page, setPage] = useState('home');

  // Function that returns another function.
  const toPage = (page) => (event) => {
    event.preventDefault();
    setPage(page);
  };

  const content = () => {
    if (page === 'notes') {
      return <Notes />;
    } else if (page === 'users') {
      return <Users />;
    } else {
      return <Home />;
    }
  };

  return (
    <div>
      <header>
        <a href="/" onClick={toPage('home')} style={{ padding: 5 }}>
          home
        </a>
        <a href="/notes" onClick={toPage('notes')} style={{ padding: 5 }}>
          notes
        </a>
        <a href="/users" onClick={toPage('users')} style={{ padding: 5 }}>
          users
        </a>
      </header>

      <main>{content()}</main>
    </div>
  );
}

export default App;
