import axios from 'axios';

const URL = '/api/login';

export const login = async (credentials) => {
  const response = await axios.post(URL, credentials);
  return response.data;
};
