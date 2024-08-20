import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import { useUser } from '../hooks/useUser';
import { getBlog } from '../services/blogs';

function Blog() {
  const { user } = useUser();
  const { id } = useParams();
  const { likeBlogMutation, removeBlogMutation, commentBlogMutation } =
    useBlogs();

  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const blogObject = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id)
  });

  if (blogObject.isLoading) return <p>Loading...</p>;

  const blog = blogObject.data;

  const handleIncreaseLikes = async () => {
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleSendComment = async () => {
    if (comment.trim() === '') return null;
    commentBlogMutation.mutate(
      { comment, id },
      { onSuccess: () => setComment('') }
    );
  };

  const handleRemove = async () => {
    if (user.id === blog.user.id) {
      const isConfirmed = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      );

      if (isConfirmed) {
        removeBlogMutation.mutate(blog.id, { onSuccess: () => navigate('/') });
      }
    }
  };

  return (
    <div>
      <h1>
        {blog.title}, {blog.author}
      </h1>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{blog.likes} likes</p>
        <button onClick={handleIncreaseLikes}>like</button>
      </div>

      <p style={{ textAlign: 'left' }}>Added by {blog.user.name}</p>

      <button
        style={
          user?.id !== blog.user.id ? { display: 'none' } : { display: 'block' }
        }
        onClick={handleRemove}
      >
        delete
      </button>

      <h3>Comments</h3>

      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" onClick={handleSendComment}>
          add comment
        </button>
      </div>

      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, idx) => (
            <li key={idx} style={{ textAlign: 'initial' }}>
              {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet...</p>
      )}
    </div>
  );
}

export default Blog;
