import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Sending a diary');
});

export default router;
