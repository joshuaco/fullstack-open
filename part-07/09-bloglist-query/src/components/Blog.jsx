import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { useUser } from '../hooks/useUser';
import { getBlog } from '../services/blogs';

function Blog() {
  const { likeBlogMutation, removeBlogMutation } = useBlogs();
  const { user } = useUser();
  const { id } = useParams();
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

      <p>Added by {blog.user.name}</p>

      <button
        style={
          user?.id !== blog.user.id ? { display: 'none' } : { display: 'block' }
        }
        onClick={handleRemove}
      >
        delete
      </button>
    </div>
  );
}

export default Blog;
