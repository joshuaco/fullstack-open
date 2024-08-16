/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import { useUser } from '../hooks/useUser';
import NotificationContext from '../contexts/NotificationContext';

function BlogForm({ toggleRef }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { setNotification } = useContext(NotificationContext);
  const { newBlogMutation } = useBlogs();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || author === '' || url === '') {
      setNotification('Error: All fields are required', 3);
      return;
    }

    toggleRef.current.toggleVisibility();
    const blogData = { title, author, url };
    newBlogMutation.mutate({ blogData, user });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="title"
            data-testid="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="author"
            data-testid="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="url"
            id="url"
            data-testid="url"
            placeholder="https://yourblog.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default BlogForm;
