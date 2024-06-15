/* eslint-disable react/prop-types */
import Blog from './Blog';
import BlogForm from './BlogForm';

function Content({ blogs, setBlogs, user, onLogout, setMessage }) {
  return (
    <div>
      <p>
        Welcome {user.name} <button onClick={onLogout}>logout</button>
      </p>

      <BlogForm setBlogs={setBlogs} setMessage={setMessage} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Content;
