import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  const [notification] = useContext(NotificationContext);

  if (notification === null) {
    return null;
  }

  return (
    <div style={style}>
      <div>{notification}</div>
    </div>
  );
};

export default Notification;
