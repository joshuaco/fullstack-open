import { useContext } from 'react';
import { login } from '../services/login';
import { setToken } from '../services/blogs';
import UserContext from '../contexts/UserContext';
import NotificationContext from '../contexts/NotificationContext';

export const useUser = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const loggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem('blogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      userDispatch({ type: 'SET_USER', payload: user });
      setToken(user.token);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const userData = await login({ username, password });
      localStorage.setItem('blogUser', JSON.stringify(userData));

      userDispatch({ type: 'SET_USER', payload: userData });
      setToken(userData.token);
    } catch (e) {
      setNotification('Error: username or password incorrect', 3);
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    userDispatch({ type: 'CLEAR_USER' });
    setToken(null);
  };

  return { user, loggedUser, loginUser, logoutUser };
};
