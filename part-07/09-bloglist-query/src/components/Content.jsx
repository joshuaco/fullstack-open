/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Content({ blogs, setBlogs, user, onLogout }) {
  const blogFormRef = useRef();

  const orderedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user && (
        <p>
          Welcome {user.name} <button onClick={onLogout}>logout</button>
        </p>
      )}
      <hr />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm setBlogs={setBlogs} toggleRef={blogFormRef} user={user} />
      </Togglable>

      {orderedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} userID={user.id} />
      ))}
    </div>
  );
}

export default Content;
