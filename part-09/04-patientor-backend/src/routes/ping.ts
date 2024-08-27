import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Someone pinged here');
  res.send('Pong!');
});

export default router;
