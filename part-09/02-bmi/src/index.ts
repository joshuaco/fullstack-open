import express from 'express';
import bmiRouter from './routes/bmi';
import calculatorRouter from './routes/calculator';

const app = express();

app.use(express.json());
app.use('/bmi', bmiRouter);
app.use('/exercises', calculatorRouter);

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
