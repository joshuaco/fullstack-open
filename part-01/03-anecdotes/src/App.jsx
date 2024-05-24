import { useState } from 'react';

import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [hasVoted, setHasVoted] = useState(false);

  const randomAnecdote = () => {
    // Avoid the same anecdote twice in a row
    const random = Math.floor(Math.random() * anecdotes.length);

    if (random === selected) {
      return randomAnecdote();
    }
    return random;
  };

  const nextAnecdote = () => {
    setSelected(randomAnecdote());
  };

  const voteAnecdote = () => {
    const newVote = [...votes];
    newVote[selected] += 1;

    setHasVoted(true);
    setVotes(newVote);
  };

  const mostVotedAnecdote = () => {
    const Maxvotes = Math.max(...votes);
    return votes.indexOf(Maxvotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p className="anecdote">&quot;{anecdotes[selected]}&quot;</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={voteAnecdote}>Vote</button>
        <button onClick={nextAnecdote}>Next anecdote</button>
      </div>

      {hasVoted && (
        <div style={{ marginTop: '48px' }}>
          <h2>Anecdote with most votes</h2>
          <p className="anecdote">
            &quot;{anecdotes[mostVotedAnecdote()]}&quot;
          </p>
          <p>has {votes[mostVotedAnecdote()]} votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
