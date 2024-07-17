import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const asObject = (content) => {
  return {
    content,
    votes: 0
  };
};

const getAll = async () => {
  const response = await axios(baseURL);
  return response.data;
};

const createNew = async (content) => {
  const newObject = asObject(content);
  const response = await axios.post(baseURL, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  await axios.put(`${baseURL}/${id}`, newObject);
};

export default { getAll, createNew, update };
