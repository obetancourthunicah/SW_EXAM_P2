import express from 'express';
const router  = express.Router();


import entidadesRouter from './entidad/entidad';

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

router.use('/entidades', entidadesRouter);

export default router;
