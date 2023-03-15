import express from 'express';
const router = express.Router();
import { PlantasDao } from '@dao/models/IAuditable';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IPlantas } from '@server/dao/models/Plantas/IPlantas';
import { Plantas } from '@libs/Plantas/Plantas';
const plantasDao = new plantasDao(MongoDBConn);
let plantasModel:Plantas;
plantasDao.init().then(()=>{
  plantasModel = new plantas(PlantasDao);
});

//registrar los endpoint en router
//http://localhost:3001/plantas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "plantas/all"},
    "getById": {"method":"get", "url": "plantas/byid/:id"},
    "new": {"method":"post", "url": "plantas/new"},
    "update": {"method":"put", "url": "plantas/upd/:id"},
    "delete": {"method":"delete", "url": "plantas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await plantasModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const plantas = await plantasModel.getById(codigo);
  if(plantas){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró Empresa"});
});

router.post('/new', async (req, res) => {
  console.log("plantas /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newplantas: IPlantas = {
    codigo,
    nombre,
    status
  };
  if (await plantasModel.add(newPlantas)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Plantas"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    status="----NotRecieved------",
    observacion = "",
    codigo = "",
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || status === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const Updateplantas : IPlantas = {
    codigo,
    nombre,
    status,
    observacion
  };

  if (await plantasModel.update(id, UpdatePlantas)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar plantas"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await plantasModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar plantas"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
