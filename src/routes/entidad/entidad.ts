import express from 'express';
const router = express.Router();
import { Entidades } from '@dao/models/entidad/IEntidad';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEntidad } from '@dao/models/entidad/IEntidad';
import { Entidad} from '@libs/entidad/entidad';
const empresasDao = new Entidades(MongoDBConn);
let entidades:Entidad;
empresasDao.init().then(()=>{
  entidades = new Entidad(empresasDao);
});


router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "empresas/all"},
    "getById": {"method":"get", "url": "empresas/byid/:id"},
    "new": {"method":"post", "url": "empresas/new"},
    "update": {"method":"put", "url": "empresas/upd/:id"},
    "delete": {"method":"delete", "url": "empresas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await Entidad.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const empresa = await Entidad.getById(codigo);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró La entidad"});
});

router.post('/new', async (req, res) => {
  console.log("Empresas /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  
  const newEntidad: IEntidad = {
    codigo,
    nombre,
    status
  };
  if (await Entidad.add(newEntidad)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Entidad"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----XXXXXXXXXXXXXX------",
    status="----XXXXXXXXXXX------",
    observacion = "",
    codigo = "",
  } = req.body;

  if (
    nombre === "---XXXXXXXXX------"
    || status === "----XXXXXXXX------"
  ) {
    return res.status(403).json({"error":"Debe estar el nombre y status correctos"});
  }
  const UpdateEntidad : IEntidad = {
    codigo,
    nombre,
    status,
    observacion
  };

  if (await entidades.update(id, UpdateEntidad)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar La entidad"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await Entidad.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Entidad"});
});

export default router;