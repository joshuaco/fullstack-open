/* eslint-disable react/prop-types */
import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

function App() {
  const [reviews, setReviews] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });
  const [total, setTotal] = useState(0);

  const handleClick = (event) => {
    setReviews({
      ...reviews,
      [event.target.id]: reviews[event.target.id] + 1
    });

    setTotal((prevTotal) => prevTotal + 1);
  };

  return (
    <>
      <h1>Give Feedback</h1>

      <div style={{ display: 'flex', gap: '5px' }}>
        <Button id="good" onVote={(e) => handleClick(e)}>
          good
        </Button>
        <Button id="neutral" onVote={(e) => handleClick(e)}>
          neutral
        </Button>
        <Button id="bad" onVote={(e) => handleClick(e)}>
          bad
        </Button>
      </div>

      <Statistics reviews={reviews} total={total} />
    </>
  );
}

export default App;
