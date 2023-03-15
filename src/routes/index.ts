import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import plantasRoute from './plantas/Plantas';
router.use('/Plantas', plantasRoute);

export default router;
