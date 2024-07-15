/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  return <>{notification && <div style={style}>{notification}</div>}</>;
};

export default Notification;
