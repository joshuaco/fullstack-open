import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    console.log('Someone pinged here');
    res.send('Pong!');
  } catch (error) {
    console.log('Pong error');
    res.status(400).json({ error });
  }
});

export default router;
