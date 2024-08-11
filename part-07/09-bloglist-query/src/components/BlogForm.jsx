/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { create } from '../services/blogs';
import NotificationContext from '../contexts/NotificationContext';

function BlogForm({ setBlogs, toggleRef, user }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const setNotification = useContext(NotificationContext)[1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || author === '' || url === '') {
      setNotification('Error: All fields are required', 3);
      return;
    }

    try {
      toggleRef.current.toggleVisibility();
      const newBlog = await create({ title, author, url });

      newBlog.user = {
        id: user.id,
        name: user.name,
        username: user.username
      };

      setNotification(
        `Blog '${newBlog.title}' has been added successfully!`,
        3
      );
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog));

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (e) {
      setNotification('Error creating blog', 3);
    }
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
