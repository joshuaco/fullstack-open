import { createSlice, current } from '@reduxjs/toolkit';
import { notes as initialState } from '../mock/notes';

const generateID = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      // Immer library simplifies handling immutable data structures
      state.push({
        content,
        important: false,
        id: generateID()
      });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };

      console.log(current(state));

      return state.map((note) => (note.id !== id ? note : changedNote));
    }
  }
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
