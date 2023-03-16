import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import usuariosRouter from './Usuarios/Usuarios';
router.use('/usuarios', usuariosRouter);

export default router;
