import StatisticLine from './StatisticLine';

/* eslint-disable react/prop-types */
function Statistics({ reviews, total }) {
  const average = (reviews.good - reviews.bad) / total || 0;
  const positiveAverage = `${(reviews.good / total) * 100}%` || 0;

  return (
    <div>
      <h2>Statistics</h2>
      {total > 0 ? (
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={reviews.good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={reviews.neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={reviews.bad} />
            </tr>
            <tr>
              <StatisticLine text="all" value={total} />
            </tr>
            <tr>
              <StatisticLine text="average" value={average} />
            </tr>
            <tr>
              <StatisticLine text="positive" value={positiveAverage} />
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default Statistics;
