/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Notification from './Notification';

function Header() {
  const { user, logoutUser, loggedUser } = useUser();

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user && (
        <>
          <p>
            Welcome {user.name} <button onClick={logoutUser}>logout</button>
          </p>
          <hr />
        </>
      )}
    </div>
  );
}

export default Header;
