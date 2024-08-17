import { useUser } from './hooks/useUser';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Content from './components/Content';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import './App.css';

function App() {
  const { user } = useUser();

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:username" element={<User />} />

        <Route
          path="/"
          element={
            user ? (
              <Content />
            ) : (
              <Togglable buttonLabel="login">
                <Login />
              </Togglable>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
