import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diaryService.getEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findByID(+req.params.id);

  if (diary) {
    res.send(diary);
  } else {
    res.status(404).end();
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiaryEntry(newDiaryEntry);

    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
