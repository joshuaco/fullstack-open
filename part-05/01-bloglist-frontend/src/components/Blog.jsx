import { useState } from 'react';
import { remove, update } from '../services/blogs';

/* eslint-disable react/prop-types */
function Blog({ blog, setBlogs, userID, setMessage }) {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleIncreaseLikes = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    };

    const { likes } = await update(updatedBlog);

    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? { ...b, likes } : b))
    );
  };

  const handleRemove = async () => {
    if (userID === blog.user.id) {
      const isConfirmed = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      );

      if (isConfirmed) {
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));

        await remove(blog.id);
      }
    } else {
      setMessage('Error: You are not allowed to remove this blog');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ fontWeight: 'bold' }}>
          {blog.title} -{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            {blog.author}
          </span>
        </p>
        <button style={{ marginLeft: 'auto' }} onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left'
          }}
        >
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={handleIncreaseLikes}>like</button>
          </p>
          <p>{blog.user.name}</p>

          <button style={{ width: '15%' }} onClick={handleRemove}>
            remove
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;
