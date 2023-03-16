import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import cancionesRouter from './canciones/canciones';
router.use('/canciones', cancionesRouter);

export default router;
