import express from 'express';
const router  = express.Router();

router.get('/', (req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

export default router;
