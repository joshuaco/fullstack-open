/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notification);

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
