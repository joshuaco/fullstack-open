import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
    },
    get(state) {
      return state;
    }
  }
});

export const { create, upvote, set, get } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(create(newAnecdote));
  };
};

export const upvoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    dispatch(upvote(id));
    const updatedAnecdote = {
      ...getState().anecdotes.find((a) => a.id === id)
    };
    await anecdoteService.update(id, updatedAnecdote);
  };
};

export default anecdoteSlice.reducer;
