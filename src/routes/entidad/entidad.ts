import express from 'express';
const router = express.Router();
import { EntidadesDao } from '@dao/models/entidad/Entidad';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEntidad } from '@dao/models/entidad/IEntidad';
import { Entidades } from '@libs/entidad/entidad';
const entidadesDao = new EntidadesDao(MongoDBConn);
let entidadesModel:Entidades;
entidadesDao.init().then(()=>{
  entidadesModel = new Entidades(entidadesDao);
});

//registrar los endpoint en router
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "entidades/all"},
    "getById": {"method":"get", "url": "entidades/byid/:id"},
    "new": {"method":"post", "url": "entidades/new"},
    "update": {"method":"put", "url": "entidades/upd/:id"},
    "delete": {"method":"delete", "url": "entidades/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await entidadesModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const entidad = await entidadesModel.getById(codigo);
  if(entidad){
    return res.status(200).json(entidad);
  }
  return res.status(404).json({"error":"No se encontró entidad"});
});

router.post('/add', async (req, res) => {
  console.log("entidades /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="Tormenta",
    artista="Gorillaz",
    album="last",
    link="",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEntidad: IEntidad = {
    codigo,
    nombre,
    artista,
    album,
    status,
    link
  };
  if (await entidadesModel.add(newEntidad)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
  );
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    artista="",
    album="",
    status="----NotRecieved------",
    link = "",
    codigo = "",
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || status === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const UpdateEntidad : IEntidad = {
    codigo,
    nombre,
    artista,
    album,
    status,
    link
  };

  if (await entidadesModel.update(id, UpdateEntidad)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Entidad"
      }
    );
});

router.delete('/delete/:id', async (req, res)=>{
  const {id } = req.params;
  if(await entidadesModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Entidad"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
