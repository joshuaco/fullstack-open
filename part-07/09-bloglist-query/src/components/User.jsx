import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/users';

function User() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(username).then(setUser);
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}</h1>

      <section>
        <h3>Added blogs</h3>
        <ul style={{ textAlign: 'left' }}>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default User;
