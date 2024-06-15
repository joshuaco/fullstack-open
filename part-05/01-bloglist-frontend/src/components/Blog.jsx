/* eslint-disable react/prop-types */
function Blog({ blog }) {
  return (
    <div>
      <p>
        {blog.title} <span>{blog.author}</span>
      </p>
    </div>
  );
}

export default Blog;
