import express from 'express';
const router = express.Router();
import { TareasDao } from '@dao/models/Tareas/TareasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { ITarea } from '@dao/models/Tareas/ITareas';
import { Tareas } from '@libs/Tareas/Tareas';
const TareasDao = new TareasDao(MongoDBConn);
let TareasModel:Tareas;
TareasDao.init().then(()=>{
  TareasModel = new Tareas(TareasDao);
});


router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "Tareas/all"},
    "getById": {"method":"get", "url": "Tareas/byid/:id"},
    "new": {"method":"post", "url": "Tareas/new"},
    "update": {"method":"put", "url": "Tareas/upd/:id"},
    "delete": {"method":"delete", "url": "Tareas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await TareasModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const Tarea = await TareasModel.getById(codigo);
  if(Tarea){
    return res.status(200).json(Tarea);
  }
  return res.status(404).json({"error":"No se encontró Tarea"});
});

router.post('/new', async (req, res) => {
  console.log("Tareas /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newTarea: ITarea = {
    codigo,
    nombre,
    status
  };
  if (await TareasModel.add(newTarea)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Tarea"}
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
  const UpdateTarea : ITarea = {
    codigo,
    nombre,
    status,
    observacion
  };

  if (await TareasModel.update(id, UpdateTarea)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Tarea"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await TareasModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Tarea"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;