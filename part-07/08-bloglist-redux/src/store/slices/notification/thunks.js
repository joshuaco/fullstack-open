import { setState } from './notificationSlice';

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setState(message));
    setTimeout(() => {
      dispatch(setState(null));
    }, time * 1000);
  };
};
