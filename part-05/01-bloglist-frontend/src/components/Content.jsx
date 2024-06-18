/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Content({ blogs, setBlogs, user, onLogout, setMessage }) {
  const blogFormRef = useRef();

  return (
    <div>
      <p>
        Welcome {user.name} <button onClick={onLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          setBlogs={setBlogs}
          setMessage={setMessage}
          toggleRef={blogFormRef}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Content;
