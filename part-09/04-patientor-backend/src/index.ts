import express from 'express';
import pingRouter from './routes/ping';
import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patient';

const PORT = 3001;

const app = express();

app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
