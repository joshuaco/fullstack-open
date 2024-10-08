import express from 'express';
import pingRouter from './routes/ping';
import diaryRouter from './routes/diaries';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/ping', pingRouter);
app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
