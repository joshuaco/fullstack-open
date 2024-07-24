/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    onLogin(username);
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>
        <div>
          <input type="password" id="password" placeholder="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
