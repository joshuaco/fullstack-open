import { configureStore } from '@reduxjs/toolkit';
import { blogSlice } from './slices/blog';
import { userSlice } from './slices/user';
import { notificationSlice } from './slices/notification';

export const store = configureStore({
  // here goes the created reducers
  reducer: {
    blogs: blogSlice.reducer,
    user: userSlice.reducer,
    notification: notificationSlice.reducer
  }
});
