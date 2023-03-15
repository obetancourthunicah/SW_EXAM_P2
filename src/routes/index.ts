import express from 'express';
const router  = express.Router();
import * as moduleAlias from 'module-alias';
import logger from '@utils/logger';
const srcPath = 'src';
moduleAlias.addAliases({
  "@config": `${srcPath}/config`,
      "@handlers": `${srcPath}/handlers`,
      "@libs": `${srcPath}/libs`,
      "@middleware": `${srcPath}/middleware`,
      "@models": `${srcPath}/dao/models`,
      "@routes": `${srcPath}/routes`,
      "@utils": `${srcPath}/utils`,
      "@dao": `${srcPath}/dao`
});

import { createServer } from '@config/express';
import { MongoDBConn } from '@dao/MongoDBConn';
import { AddressInfo } from 'net';
import http from 'http';
router.get('/', (_req, res) => {
  res.json({msg: 'Examen 2ndo Parcial'});
});

