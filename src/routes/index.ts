import express from 'express';

import videosRouter from './linkVideos/linkVideos';

const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});


router.use('/videos', videosRouter);
export default router;
