/* eslint-disable react/prop-types */
import { Button, TextField } from '@mui/material';
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
          <TextField
            label="username"
            value={username}
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField label="password" type="password" variant="standard" />
        </div>
        <div>
          <Button variant="contained" type="submit" color="primary">
            login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
