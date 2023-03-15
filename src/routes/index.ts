import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import eventosRouter from './eventos/eventos';
router.use('/eventos', eventosRouter);

export default router;
