import express from 'express';
const router = express.Router();
import { MusicaDao } from '@dao/models/Musica/MusicaDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IMusica } from '@dao/models/Musica/IMusica';
import { Musica } from '@libs/Musica/Musica';
const musicaDao = new MusicaDao(MongoDBConn);
let MusicaModel:Musica;
musicaDao.init().then(()=>{
    MusicaModel = new Musica(musicaDao);
});

//registrar los endpoint en router
//http://localhost:3002/Musica
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
  res.status(200).json(await MusicaModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const Musica = await MusicaModel.getById(codigo);
  if(Musica){
    return res.status(200).json(Musica);
  }
  return res.status(404).json({"error":"No se encontró la cancion"});
});

router.post('/new', async (req, res) => {
  console.log("Musica /new request body:", req.body);
  const {
    codigo="1",
    nombrecancion ="John Doe",
    artista="John Doe ",
    album="NO",
    fechalanzamiento="",
    url=""
  } = req.body;
  //TODO: Validar Entrada de datos
  const newMusica: IMusica = {
    codigo,
    nombrecancion,
    artista,
    album,
    fechalanzamiento,
    url
  };
  if (await MusicaModel.add(newMusica)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Musica"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombrecancion="----NoRecibido------",
    artista="----NoRecibido------",
    album = "",
    fechalanzamiento = "",
    url="",
  } = req.body;

  if (
    nombrecancion === "----NoRecibido------"
    || artista === "----NoRecibido------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre de la cancion correcto"});
  }
  const UpdateMusica : IMusica = {
    album,
    fechalanzamiento,
    url
  };

  if (await MusicaModel.update(id, UpdateMusica)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar la Musica"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await MusicaModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Musica"});
});

export default router;