import express from 'express';
import { isValidArray } from '../utils';
import { calculateExercises } from '../services/exerciseCalculator';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello Calculator!');
});

router.post('/', (req, res) => {
  try {
    const { daily_exercises, target } = req.body;

    if (isNaN(+target) || !isValidArray(daily_exercises)) {
      throw new Error('malformatted parameters');
    }

    const result = calculateExercises(daily_exercises, +target);

    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

export default router;
