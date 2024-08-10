/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from './store/slices/blog/';
import Content from './components/Content';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

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
