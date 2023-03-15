import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import tareasRouter from './tareas/tareas';
router.use('/tareas',tareasRouter);

export default router;
