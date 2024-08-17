import { Link } from 'react-router-dom';
import { useQueryUsers } from '../hooks/useQueryUsers';

function Users() {
  const { users } = useQueryUsers();

  if (users.isLoading) return <p>Loading...</p>;
  if (users.isError) return <p>Sorry, we can&apos;t get that 🙁</p>;

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.data.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.username}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
