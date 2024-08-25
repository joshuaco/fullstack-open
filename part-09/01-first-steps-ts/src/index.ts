import express from 'express';
import pingRouter from './routes/ping';
import calculateRouter from './routes/calculate';

const app = express();
const PORT = 3003;

app.use(express.json());

app.use('/ping', pingRouter);
app.use('/calculate', calculateRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
