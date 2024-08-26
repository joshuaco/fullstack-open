import express from 'express';
import pingRouter from './routes/ping';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
