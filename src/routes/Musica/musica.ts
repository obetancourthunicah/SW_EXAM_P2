import express from 'express';
const router = express.Router();
import { MusicaDao } from '@dao/models/Musica/MusicaDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IMusica } from '@dao/models/Musica/Musica';
import { Musica } from '@libs/Musica/Musica';
const empresasDao = new MusicaDao(MongoDBConn);
let MusicaModel:Musica;
empresasDao.init().then(()=>{
    MusicaModel = newMusica(MusicaDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "Musica/all"},
    "getById": {"method":"get", "url": "Musica/byid/:id"},
    "new": {"method":"post", "url": "Musica/new"},
    "update": {"method":"put", "url": "Musica/upd/:id"},
    "delete": {"method":"delete", "url": "Musica/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(awaitMusicaModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const Musica = await MusicaModel.getById(codigo);
  if(Musica{
    return res.status(200).json(Musica);
  }
  return res.status(404).json({"error":"No se encontró la cancion"});
});

router.post('/new', async (req, res) => {
  console.log("Musica /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEmpresa: IMusica = {
    codigo,
    nombre,
    status
  };
  if (await MusicaModel.add(newEmpresa)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
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
  const UpdateEmpresa : IMusica = {
    codigo,
    nombre,
    status,
    observacion
  };

  if (await MusicaModel.update(id, UpdateEmpresa)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Empresa"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await MusicaModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Empresa"});
});
/*
router.get('/', function(_req, res){
});
 */

export default router;