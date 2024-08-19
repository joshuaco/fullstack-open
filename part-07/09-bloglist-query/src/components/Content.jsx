/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Content() {
  const { blogs } = useBlogs();
  const blogFormRef = useRef();

  if (blogs.isLoading) return <p>Loading...</p>;

  const orderedBlogs = [...blogs.data].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>

      <ul style={{ listStyle: 'none', textAlign: 'left', padding: 0 }}>
        {orderedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
