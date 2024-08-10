import axios from 'axios';

const URL = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (e) {
    return [];
  }
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(URL, newBlog, config);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.put(`${URL}/${blog.id}`, blog, config);
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  await axios.delete(`${URL}/${id}`, config);
};

export default { getAll, create, remove, update };
