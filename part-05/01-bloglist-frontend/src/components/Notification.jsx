/* eslint-disable react/prop-types */
function Notification({ message }) {
  const errorStyles = {
    color: 'tomato',
    fontSize: '20px'
  };

  const successStyles = {
    color: 'green',
    fontSize: '20px'
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={message.includes('Error') ? errorStyles : successStyles}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
