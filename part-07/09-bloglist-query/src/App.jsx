import { useUser } from './hooks/useUser';
import Content from './components/Content';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './App.css';

function App() {
  const { user } = useUser();

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null ? (
        <Togglable buttonLabel="login">
          <Login />
        </Togglable>
      ) : (
        <Content />
      )}
    </div>
  );
}

export default App;
