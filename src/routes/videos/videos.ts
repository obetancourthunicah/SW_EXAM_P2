import express from 'express';
const router = express.Router();
import { VideosDao } from '@dao/models/Videos/VideosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IVideos } from '@dao/models/Videos/IVideos';
import { Videos } from '@libs/Videos/Videos';
const videosDao = new VideosDao(MongoDBConn);
let videosModel:Videos;
videosDao.init().then(()=>{
  videosModel = new Videos(videosDao);
});



router.get('/all', async (_req, res) => {
  res.status(200).json(await videosModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const video = await videosModel.getById(codigo);
  if(video){
    return res.status(200).json(video);
  }
  return res.status(404).json({"error":"No se encontró el Video"});
});

router.post('/new', async (req, res) => {
  console.log("Videos /new request body:", req.body);
  const {
    nombre ="Video Github",
    descripcion = "Como instalar Github",
    url = "https://www.youtube.com/watch?v=tn6tloweTUs"


  } = req.body;
  
  const newVideo: IVideos = {
      nombre,
      descripcion,
      url
  };
  if (await videosModel.add(newVideo)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un nuevo Video"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NoseRecibio------",
    descripcion="----NoseRecibio------",
    
    
  } = req.body;

  if (
    nombre === "----NoseRecibio------"
    || descripcion === "----NoseRecibio------" 
  ) {
    return res.status(403).json({"error":"Debe venir el nombre, descripcion y url correctos"});
  }
  const UpdateVideos : IVideos = {
    nombre,
    descripcion,
    
  };

  if (await videosModel.update(id, UpdateVideos)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar el video"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await videosModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar el video"});
});


export default router;
