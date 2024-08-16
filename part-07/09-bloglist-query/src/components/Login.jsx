/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, loggedUSer } = useUser();

  useEffect(() => {
    loggedUSer();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      return;
    }

    loginUser(username, password);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="field">
          <input
            type="text"
            data-testid="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>
        <div className="field">
          <input
            type="password"
            data-testid="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
