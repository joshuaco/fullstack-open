import axios from 'axios';

const baseURL = '/api/users';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUser = async (username) => {
  try {
    const response = await axios.get(`${baseURL}/${username}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
