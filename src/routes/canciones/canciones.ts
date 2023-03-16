import express from 'express';
const router = express.Router();
import { CancionesDao } from '@dao/models/Canciones/CancionesDAO';
import { MongoDBConn } from '@dao/MongoDBConn';
import { ICancion } from '@dao/models/Canciones/ICanciones';
import { Canciones } from '@libs/Canciones/Canciones';
const cancionesDao = new CancionesDao(MongoDBConn);
let cancionesModel:Canciones;
cancionesDao.init().then(()=>{
  cancionesModel = new Canciones(cancionesDao);
});

router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "canciones/all"},
    "getById": {"method":"get", "url": "canciones/byid/:id"},
    "new": {"method":"post", "url": "canciones/new"},
    "update": {"method":"put", "url": "canciones/upd/:id"},
    "delete": {"method":"delete", "url": "canciones/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await cancionesModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const cancion = await cancionesModel.getById(codigo);
  if(cancion){
    return res.status(200).json(cancion);
  }
  return res.status(404).json({"error":"No se encontró la canción"});
});

router.post('/new', async (req, res) => {
  console.log("Canciones /new request body:", req.body);
  const {
    nombre ="Cancion Generica",
    artista = "Artista Generico",
    album = "Album Generico",
    url = "https://www.youtube.com/watch?v=mCdA4bJAGGk",
    fecha = "22-03-2023"

  } = req.body;
  //TODO: Validar Entrada de datos
  const newCancion: ICancion = {
    nombre,
    artista,
    album,
    url,
    fecha
  };
  if (await cancionesModel.add(newCancion)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un usuario"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    artista="----NotRecieved------",
    album="----NotRecieved------",
    url= "",
    fecha= "----NotRecieved------"
  } = req.body;

  if (
    nombre === "----NotRecieved------"  || 
    artista === "----NotRecieved------" || 
    album === "----NotRecieved------" ||
    fecha === "----NotRecieved------" 
  ) {
    return res.status(403).json({"error":"Debe venir el nombre, el artista, album o fecha exacto"});
  }
  const updateCancion : ICancion = {
    nombre,
    artista,
    album,
    url,
    fecha
  };

  if (await cancionesModel.update(id, updateCancion)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar la cancion"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await cancionesModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar la cancion"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;