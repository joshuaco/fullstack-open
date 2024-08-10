import blogService from '../../../services/blogs';
import { setNotification } from '../notification';
import { addBlog, setBlogs, removeBlog, updateBlog } from './blogSlice';

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);

    newBlog.user = {
      id: user.id,
      name: user.name,
      username: user.username
    };

    dispatch(addBlog(newBlog));
    return newBlog;
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const toLikeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    await blogService.update(likedBlog);
    dispatch(updateBlog(likedBlog));
    dispatch(setNotification(`You liked '${likedBlog.title}'`, 5));
  };
};
