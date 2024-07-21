import axios from 'axios';

const baseURL = 'http://localhost:3001/notes';

export const getNotes = () => axios.get(baseURL).then((res) => res.data);

export const createNote = (newNote) =>
  axios.post(baseURL, newNote).then((res) => res.data);

export const updateNote = (updatedNote) =>
  axios
    .put(`${baseURL}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
