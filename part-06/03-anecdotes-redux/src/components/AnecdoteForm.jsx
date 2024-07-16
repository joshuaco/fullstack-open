import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

function AnecdoteForm() {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    e.target.content.value = '';

    const newAnecdote = await anecdoteService.createNew(content);

    dispatch(create(newAnecdote));
    dispatch(setNotification(`You created '${content}'`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
