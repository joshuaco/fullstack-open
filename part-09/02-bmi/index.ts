import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryParams = req.query;

  try {
    const weight = Number(queryParams.weight);
    const height = Number(queryParams.height);

    if (isNaN(weight) || isNaN(height)) {
      throw new Error('malformatted parameters');
    }

    const bmi = calculateBMI(weight, height);

    res.json({ weight, height, bmi });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.json({ error: e.message });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
