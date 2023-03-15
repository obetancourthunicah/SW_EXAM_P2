import express from 'express';
const router  = express.Router();

import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import {validateJwtMiddleWare} from './middlewares/jwtTokenValidator';

router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

import securityRoutes from './security/security';
router.use('/security', validateKeyMiddleWare, securityRoutes);

export default router;
