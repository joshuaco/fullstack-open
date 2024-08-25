import express from 'express';
import { calculateBMI } from '../services/bmiCalculator';

const router = express.Router();

router.get('/', (req, res) => {
  const queryParams = req.query;

  try {
    const weight = Number(queryParams.weight);
    const height = Number(queryParams.height);

    if (isNaN(weight) || isNaN(height)) {
      throw new Error('malformatted parameters');
    }

    const bmi = calculateBMI(weight, height);

    res.json({ weight, height, bmi });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

export default router;
