import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setState(state, action) {
      return action.payload;
    }
  }
});

export const { setState } = notificationSlice.actions;
