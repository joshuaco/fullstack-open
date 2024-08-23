interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHrs: number[], target: number): Result => {
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter((hours) => hours !== 0).length;
  const success = periodLength === trainingDays;
  const average =
    dailyHrs.reduce((total, hours) => hours + total, 0) / periodLength;

  const rating = Math.round((average / target) * 10);

  let ratingDescription = '';

  if (rating < 5) {
    ratingDescription = 'poor';
  } else if (rating < 10) {
    ratingDescription = 'Good Job, but could be better';
  } else if (rating >= 10 && success) {
    ratingDescription = 'You are on fire 🔥';
  } else if (rating >= 10) {
    ratingDescription = 'You are doing great 💪';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const dailyHrs = process.argv
  .slice(3, process.argv.length)
  .map((hours) => Number(hours));
const target = Number(process.argv[2]);

console.log(calculateExercises(dailyHrs, target));
