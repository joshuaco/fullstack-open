import { useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';

/* eslint-disable react/prop-types */
function Blog({ blog, userID }) {
  const [visible, setVisible] = useState(false);
  const { likeBlogMutation, removeBlogMutation } = useBlogs();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleIncreaseLikes = async () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = async () => {
    if (userID === blog.user.id) {
      const isConfirmed = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      );

      if (isConfirmed) removeBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
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
          className="togglable-content"
        >
          <p>{blog.url}</p>
          <p className="likes">
            likes {blog.likes}{' '}
            <button onClick={handleIncreaseLikes}>like</button>
          </p>
          <p>{blog.user.name}</p>

          <button
            style={
              userID !== blog.user.id ? { display: 'none' } : { width: '20%' }
            }
            onClick={handleRemove}
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;
