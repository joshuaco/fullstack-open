/* eslint-disable react/prop-types */
import { useState } from 'react';
import { create } from '../services/blogs';

function BlogForm({ setBlogs, setMessage }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || author === '' || url === '') {
      return;
    }

    try {
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="url"
            id="url"
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
