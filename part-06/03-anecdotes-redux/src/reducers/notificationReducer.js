import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setState(state, action) {
      return action.payload;
    }
  }
});

export const { setState } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setState(message));
    setTimeout(() => {
      dispatch(setState(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
