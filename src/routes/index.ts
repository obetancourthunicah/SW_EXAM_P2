import express from 'express';
const router  = express.Router();

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial Erick Sebastian Moncada Rubi'});
});

import productosRouter from './productos/productos';
router.use('/productos', productosRouter);

export default router;
