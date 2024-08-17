/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useUser } from '../hooks/useUser';
import { useBlogs } from '../hooks/useBlogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Content() {
  const { user } = useUser();
  const { blogs } = useBlogs();
  const blogFormRef = useRef();

  if (blogs.isLoading) return <p>Loading...</p>;

  const orderedBlogs = [...blogs.data].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>

      {orderedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} userID={user.id} />
      ))}
    </div>
  );
}

export default Content;
