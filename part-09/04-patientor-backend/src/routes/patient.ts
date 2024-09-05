import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.json(patientService.getPatients());
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    res.json(patientService.findByID(id));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

    res.status(201).json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).send(error.message);
    }
  }
});

export default router;
