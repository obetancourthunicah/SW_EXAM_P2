import express from 'express';
const router = express.Router();

import { EventoDao } from '@dao/models/Evento/EventoDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEvento } from '@dao/models/Evento/IEvento';
import { Evento } from '@libs/Evento/Evento';

const eventoDao = new EventoDao(MongoDBConn);
let eventoModel:Evento;
eventoDao.init().then(()=>{
    eventoModel = new Evento(eventoDao);
});
  

  router.get('/all', async (_req, res) => {
    res.status(200).json(await eventoModel.getAll());
  });
  
  router.get('/byid/:id', async (req, res)=>{
    const {id: codigo} = req.params;
    const evento = await eventoModel.getById(codigo);
    if(evento){
      return res.status(200).json(evento);
    }
    return res.status(404).json({"error":"No se encontró Empresa"});
  });
  
  router.delete('/del/:id', async (req, res)=>{
    const {id } = req.params;
    if(await eventoModel.delete(id)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
  });



export default router;

