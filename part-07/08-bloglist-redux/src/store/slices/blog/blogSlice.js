import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload);
      state.splice(index, 1);
    },
    updateBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      state[index] = action.payload;
    }
  }
});

export const { addBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions;
