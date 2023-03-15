import express from 'express';
const router = express.Router();
import { EventosDao } from '@dao/models/Eventos/EventosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEvento } from '@dao/models/Eventos/IEventos';
import { Eventos } from '@libs/Eventos/Eventos';
const eventosDao = new EventosDao(MongoDBConn);
let eventosModel:Eventos;
eventosDao.init().then(()=>{
  eventosModel = new Eventos(eventosDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "eventos/all"},
    "getById": {"method":"get", "url": "eventos/byid/:id"},
    "new": {"method":"post", "url": "eventos/new"},
    "update": {"method":"put", "url": "eventos/upd/:id"},
    "delete": {"method":"delete", "url": "eventos/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await eventosModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const evento = await eventosModel.getById(codigo);
  if(evento){
    return res.status(200).json(evento);
  }
  return res.status(404).json({"error":"No se encontró Evento"});
});

router.post('/new', async (req, res) => {
  console.log("Eventos /new request body:", req.body);
  const {
    codigo = "E1",
    nombre ="Una tarde de alegría",
    fecha = "14/03/2023",
    hora = '18:42 pm',
    descripcion ='',
    ubicacion = 'Celbrar en familia',
    categoria = 'Reunion'

    
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEvento: IEvento = {
    codigo,
    nombre,
    fecha,
    hora,
    descripcion,
    ubicacion,
    categoria
  };
  if (await eventosModel.add(newEvento)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un nuevo Evento"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    fecha= "----NotRecieved------",
    hora= "----NotRecieved------",
    descripcion= "----NotRecieved------",
    ubicacion= "----NotRecieved------",
    categoria= "----NotRecieved------",
    codigo = "",
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || fecha=== "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const updateEvento : IEvento = {
    codigo,
    nombre,
    fecha,
    hora,
    descripcion,
    ubicacion,
    categoria
    
  };

  if (await eventosModel.update(id, updateEvento)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Evento"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await eventosModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Evento"});
});
/*
router.get('/', function(_req, res){
});
 */

export default router;