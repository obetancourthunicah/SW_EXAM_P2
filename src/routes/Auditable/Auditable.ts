import express from 'express';
const router = express.Router();
import { IAuditable } from '@server/dao/models/IAuditable';
import { AuditableDao } from '@server/dao/models/AuditableDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { Auditable } from '@server/libs/Auditable/Auditable';

const auditableDao = new AuditableDao(MongoDBConn);

let ModeloAuditable:Auditable;
auditableDao.init().then(() =>{
    ModeloAuditable = new Auditable(auditableDao);
})
  



export default router;