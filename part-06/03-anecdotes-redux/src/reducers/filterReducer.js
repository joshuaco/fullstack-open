const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER_ANECDOTES') {
    return action.payload;
  }

  return state;
};

export default filterReducer;

export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER_ANECDOTES',
    payload: filter
  };
};
