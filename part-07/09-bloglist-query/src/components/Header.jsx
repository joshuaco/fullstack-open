/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import Notification from './Notification';
import { Link } from 'react-router-dom';

function Header() {
  const { user, logoutUser, loggedUser } = useUser();

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div>
      <header>
        <nav
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          {user && (
            <p>
              {user.name} <button onClick={logoutUser}>logout</button>
            </p>
          )}
        </nav>
      </header>
      <h1>Blogs</h1>

      <Notification />

      {/* {user && (
        <>
          <p>
            Welcome {user.name} <button onClick={logoutUser}>logout</button>
          </p>
          <hr />
        </>
      )} */}
    </div>
  );
}

export default Header;
