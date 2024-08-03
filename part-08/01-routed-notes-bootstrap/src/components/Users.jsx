import { useState } from 'react';

/* eslint-disable react/prop-types */
function Users({ notes }) {
  // users array with notes authors without duplicates
  const [users] = useState([...new Set(notes.map((note) => note.user))]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
