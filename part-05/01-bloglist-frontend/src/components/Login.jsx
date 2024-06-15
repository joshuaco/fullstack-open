/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { login } from '../services/login';
import { useEffect } from 'react';
import { setToken } from '../services/blogs';

function Login({ setUser, setMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      return;
    }

    try {
      const user = await login({ username, password });

      window.localStorage.setItem('blogUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setMessage(null);
    } catch (e) {
      setMessage('Error: username or password incorrect');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
