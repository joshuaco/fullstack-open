import { useDispatch, useSelector } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a, b) => b.votes - a.votes);
    } else {
      return [...anecdotes]
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);
    }
  });

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(upvoteAnecdote(id));
    dispatch(setNotification(`You voted '${content}'`, 2));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
