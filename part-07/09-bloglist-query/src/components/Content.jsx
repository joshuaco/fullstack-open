/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { Badge, ListGroup } from 'react-bootstrap';

function Content() {
  const { blogs } = useBlogs();
  const blogFormRef = useRef();

  if (blogs.isLoading) return <p>Loading...</p>;

  const orderedBlogs = [...blogs.data].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>

      <ListGroup as="ul" variant="flush" className="mt-3">
        {orderedBlogs.map((blog) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
            key={blog.id}
          >
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <Badge bg="primary">{blog.likes}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Content;
