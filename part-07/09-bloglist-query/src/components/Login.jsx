/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Button, Form } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser();

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

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-1 w-25 mx-auto" controlId="username">
          <Form.Control
            type="text"
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-2 w-25 mx-auto" controlId="password">
          <Form.Control
            type="password"
            data-testid="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </Form.Group>
        <Button type="submit" className="w-25 mt-2">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
