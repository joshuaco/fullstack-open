/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../store/slices/blog';
import { setNotification } from '../store/slices/notification';

function BlogForm({ toggleRef }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === '' || author === '' || url === '') {
      dispatch(setNotification('Error: All fields are required', 5));
      return;
    }

    try {
      toggleRef.current.toggleVisibility();
      const newBlog = await dispatch(createBlog({ title, author, url }, user));

      dispatch(
        setNotification(
          `Blog '${newBlog.title}' has been added successfully!`,
          5
        )
      );

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (e) {
      dispatch(setNotification(`Error: ${e.response.data.error}`, 5));
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
