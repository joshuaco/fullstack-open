import axios from 'axios';

export async function getNotes() {
  const response = await axios.get('http://localhost:3001/notes');
  const notes = await response.data;

  return notes;
}

export async function createNote(newNote) {
  const response = await axios.post('http://localhost:3001/notes', newNote);
  return response.data;
}

export async function updateNote(id, note) {
  const response = await axios.put(`http://localhost:3001/notes/${id}`, note);
  return response.data;
}

export async function deleteNote(id) {
  try {
    const response = await axios.delete(`http://localhost:3001/notes/${id}`);
    return response;
  } catch (e) {
    alert(`Note not found`);
  }
}
