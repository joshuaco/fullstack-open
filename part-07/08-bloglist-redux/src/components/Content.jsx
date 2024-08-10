/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/user';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

function Content() {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const orderedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {user && (
        <p>
          Welcome {user.name}{' '}
          <button onClick={() => dispatch(logout())}>logout</button>
        </p>
      )}

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
