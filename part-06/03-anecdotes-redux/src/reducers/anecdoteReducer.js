import { createSlice } from '@reduxjs/toolkit';

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload);
    },
    upvote(state, action) {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    set(state, action) {
      return action.payload;
    }
  }
});

export const { create, upvote, set } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
