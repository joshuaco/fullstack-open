import express from 'express';
import { calculator } from '../services/calculator';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Hello!');
});

router.post('/', (req, res) => {
  try {
    const { value1, value2, op } = req.body;

    if (!value1 || isNaN(+value1)) {
      throw new Error('invalid paramters');
    }

    const result = calculator(+value1, +value2, op);

    res.send({ result });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

export default router;
