import axios from 'axios';

const baseURL = '/api/login';

export const login = async (credentials) => {
  try {
    const response = await axios.post(baseURL, credentials);
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
