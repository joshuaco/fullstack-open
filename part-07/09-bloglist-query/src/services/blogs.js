import axios from 'axios';

const URL = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (e) {
    return [];
  }
};

export const getBlog = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const create = async (newBlog, user) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(URL, newBlog, config);
  const newBlogData = response.data;

  newBlogData.user = {
    id: user.id,
    name: user.name,
    username: user.username
  };

  return newBlogData;
};

export const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.put(`${URL}/${blog.id}`, blog, config);
  return response.data;
};

export const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${URL}/${id}`, config);
};
