import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import plantasRouter from './plantas/Plantas';
router.use('/plantas', plantasRouter);

export default router;
