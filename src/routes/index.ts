import express from 'express';
const router  = express.Router();

import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import {validateJwtMiddleWare} from './middlewares/jwtTokenValidator';
router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});
router.get('/version', (_req, res)=>{
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be", "version": version};
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
 });


import entidadRouter from './entidad/entidad';
router.use('/entidad', validateKeyMiddleWare, validateJwtMiddleWare, entidadRouter);


export default router;
