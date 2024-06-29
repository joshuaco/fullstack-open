import { useState, useEffect } from 'react';
import { setToken } from './services/blogs';
import { getAll } from './services/blogs';
import Content from './components/Content';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await getAll();
      setBlogs(blogs);
    };

    getBlogs();
  }, []);

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <Login setUser={setUser} setMessage={setMessage} />
        </Togglable>
      ) : (
        <Content
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          onLogout={logout}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default App;
