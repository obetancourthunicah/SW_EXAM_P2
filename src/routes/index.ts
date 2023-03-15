import express from 'express';
const router  = express.Router();
import musicRouter from './Music/music'

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

router.use('/music', musicRouter);

export default router;
