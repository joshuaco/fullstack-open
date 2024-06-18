/* eslint-disable react/prop-types */
function Blog({ blog }) {
  return (
    <div>
      <p style={{ fontWeight: 'bold' }}>
        {blog.title} -{' '}
        <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
          {blog.author}
        </span>
      </p>
    </div>
  );
}

export default Blog;
