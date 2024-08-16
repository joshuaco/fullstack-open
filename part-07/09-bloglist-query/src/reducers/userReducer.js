export const userReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return action.payload;
  } else if (action.type === 'CLEAR_USER') {
    return null;
  }
  return state;
};
