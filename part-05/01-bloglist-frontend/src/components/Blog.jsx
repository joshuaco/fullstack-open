import { useState } from 'react';

/* eslint-disable react/prop-types */
function Blog({ blog }) {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const toggleVisibility = () => {
    setVisible(!visible);
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
            likes {blog.likes} <button>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
