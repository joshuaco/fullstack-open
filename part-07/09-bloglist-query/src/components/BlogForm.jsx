/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import { useUser } from '../hooks/useUser';
import NotificationContext from '../contexts/NotificationContext';
import { Button, Form } from 'react-bootstrap';

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

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-1 w-25 mx-auto" controlId="title">
          <Form.Control
            type="text"
            data-testid="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-25 mx-auto" controlId="author">
          <Form.Control
            type="text"
            data-testid="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2 w-25 mx-auto" controlId="url">
          <Form.Control
            type="url"
            data-testid="url"
            placeholder="https://yourblog.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Button className="w-25 mt-2" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default BlogForm;
