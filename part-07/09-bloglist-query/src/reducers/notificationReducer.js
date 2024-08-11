export const notificationReducer = (state, action) => {
  if (action.type === 'SET') {
    return action.payload;
  } else if (action.type === 'CLEAR') {
    return null;
  }
  return state;
};
