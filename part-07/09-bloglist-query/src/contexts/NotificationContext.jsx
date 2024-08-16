import { createContext, useReducer } from 'react';
import { notificationReducer } from '../reducers/notificationReducer';

const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export function NotificationProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  const setNotification = (message, time) => {
    notificationDispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, time * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
