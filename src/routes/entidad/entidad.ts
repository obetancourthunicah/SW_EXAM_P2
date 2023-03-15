import express from 'express';
const router = express.Router();
import { EntidadDao } from '@dao/models/entidad/EntidadDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEntidad } from '@dao/models/entidad/IEntidad';
import { Entidad } from '@libs/entidad/entidad';
const entidadDao = new EntidadDao(MongoDBConn);
let entidadModel:Entidad;
entidadDao.init().then(()=>{
  entidadModel = new Entidad(entidadDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "entidad/all"},
    "getById": {"method":"get", "url": "entidad/byid/:id"},
    "new": {"method":"post", "url": "entidad/new"},
    "update": {"method":"put", "url": "entidad/upd/:id"},
    "delete": {"method":"delete", "url": "entidad/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await entidadModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const entidad = await entidadModel.getById(codigo);
  if(entidad){
    return res.status(200).json(entidad);
  }
  return res.status(404).json({"error":"No se encontró Entidad"});
});

router.post('/new', async (req, res) => {
  console.log("Entidad /new request body:", req.body);
  const {
    codigo = "NA",
    nombreCientifico ="",
    combreComun="",
    luzSolar="",
    riegorequerido ="",
    cuidados =""
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEntidad: IEntidad = {
    codigo,
    nombreCientifico ,
    combreComun,
    luzSolar,
    riegorequerido ,
    cuidados 
  };
  if (await entidadModel.add(newEntidad)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Entidad"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    codigo = "",
    nombreCientifico ="",
    combreComun="",
    luzSolar="",
    riegorequerido ="",
    cuidados =""
  } = req.body;

  if (
    nombreCientifico === ""
    || nombreComun === ""
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const UpdateEntidad : IEntidad = {
    codigo,
    nombreCientifico ,
    combreComun,
    luzSolar,
    riegorequerido ,
    cuidados
  };

  if (await entidadModel.update(id, UpdateEntidad)) {
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

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await entidadModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Entidad"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
