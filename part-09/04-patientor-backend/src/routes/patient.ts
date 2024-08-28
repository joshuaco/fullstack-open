import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.json(patientService.getPatients());
    console.log('Fetched data');
  } catch (error) {
    console.log({ error });
    res.status(400).end();
  }
});

export default router;
