import axios from 'axios';

const URL = '/api/notes';

export async function getNotes() {
  const response = await axios.get(URL);
  const notes = await response.data;

  return notes;
}

export async function createNote(newNote) {
  const response = await axios.post(URL, newNote);
  return response.data;
}

export async function updateNote(id, note) {
  const response = await axios.put(`${URL}/${id}`, note);
  return response.data;
}

export async function deleteNote(id) {
  const response = await axios.delete(`${URL}/${id}`);
  return response;
}
