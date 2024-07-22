import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, voteAnecdote } from './requests';
import { useContext } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import NotificationContext from './components/NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2
  });

  const [notification, notificationDispatch] = useContext(NotificationContext);

  console.log(JSON.parse(JSON.stringify(query)));

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({
        type: 'SET',
        payload: `you voted '${anecdote.content}'`
      });
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    }
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (query.isPending) {
    return <div>Loading data...</div>;
  }

  if (query.isError) {
    return <div>anecdote service not available due to problems in server.</div>;
  }

  const anecdotes = query.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
