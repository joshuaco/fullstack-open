import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

/* eslint-disable react/prop-types */
function Notification() {
  const { notification } = useContext(NotificationContext);

  const errorStyles = {
    color: 'tomato',
    fontSize: '20px'
  };

  const successStyles = {
    color: 'green',
    fontSize: '20px'
  };

  if (notification === null) {
    return null;
  }

  return (
    <div style={notification.includes('Error') ? errorStyles : successStyles}>
      <p>{notification}</p>
    </div>
  );
}

export default Notification;
