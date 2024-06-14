import axios from 'axios';

const URL = '/api/notes';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export async function getNotes() {
  const response = await axios.get(URL);
  const notes = await response.data;

  return notes;
}

export async function createNote(newNote) {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(URL, newNote, config);
  return response.data;
}

export async function updateNote(id, note) {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.put(`${URL}/${id}`, note, config);
  return response.data;
}

export async function deleteNote(id) {
  const response = await axios.delete(`${URL}/${id}`);
  return response;
}
