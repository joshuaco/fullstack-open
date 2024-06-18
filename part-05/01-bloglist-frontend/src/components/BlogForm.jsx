/* eslint-disable react/prop-types */
import { useState } from 'react';
import { create } from '../services/blogs';

function BlogForm({ setBlogs, setMessage, toggleRef }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || author === '' || url === '') {
      setMessage('Error: All fields are required');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      toggleRef.current.toggleVisibility();
      const newBlog = await create({ title, author, url });

      setMessage(`Blog '${newBlog.title}' has been added successfully!`);
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog));

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (e) {
      setMessage('Error creating blog');
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input
            type="url"
            id="url"
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
