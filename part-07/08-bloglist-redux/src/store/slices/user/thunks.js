import { setToken } from '../../../services/blogs';
import loginService from '../../../services/login';
import { setNotification } from '../notification';
import { setUser } from './userSlice';

export const storeUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      localStorage.setItem('blogUser', JSON.stringify(user));

      dispatch(setUser(user));
      setToken(user.token);
    } catch (e) {
      dispatch(setNotification('Error: username or password incorrect', 5));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const userJSON = window.localStorage.getItem('blogUser');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
      setToken(user.token);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(setUser(null));
    setToken(null);
  };
};
