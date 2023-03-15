import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import videosRouter from './videos/videos';


router.use('/videos', videosRouter);


export default router;
