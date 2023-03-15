import express from 'express';
import { PlantasDao } from '@dao/models/Plantas/Plantas';
import { MongoDBConn } from '@dao/MongoDBConn';
import {Plantas} from '@libs/Plantas/plantas';

const plantasDao = new PlantasDao(MongoDBConn);
let PlantasDao;
let fodaModel:Plantas;
plantasDao.init().then(()=>{
  PlantasDao = new PlantasDao(MongoDBConn, plantasDao);
  PlantasDao.init().then(()=>{
    fodaModel = new Plantas(PlantasDao);
  });
});
const router = express.Router();

router.get('/:planta/foda', async (req, res)=>{
  const {plantas} = req.params;
  const fodas = await fodaModel.get(Plantas);
  return res.status(200).json(fodas);
});

router.post('/:planta/new', async (req, res)=>{
  const { plantas }  = req.params as {plantas:string};
  const { nombreCientifico } = req.body;
  const result = await fodaModel.newUser(nombreCientifico, plantas);
  return res.status(200).json(result);
});

router.put('/:planta/tmp/:fodaId', async (req, res)=>{
  const {plantaId} = req.params;
  const {type} = req.body;
  const updObject = await fodaModel.updateFoda(fodaId, type);
  return res.status(200).json(updObject);
});

router.put('/:planta/upd/:fodaId/nombre', async (req, res)=>{
  const {plantaId} = req.params;
  const {nombre} = req.body;
  const updObject = await fodaModel.setNombreCientifico(fodaId, nombre);
  return res.status(200).json(updObject);
});
router.put('/:planta/upd/:fodaId/estado', async (req, res)=>{
  const {fodaId} = req.params;
  const {estado} = req.body;
  const updObject = await fodaModel.setEstado(fodaId, estado);
  return res.status(200).json(updObject);
});
router.put('/:planta/upd/:fodaId/observacion', async (req, res)=>{
  const {planta} = req.params;
  const {observacion} = req.body;
  const updObject = await fodaModel.setObservation(fodaId, observacion);
  return res.status(200).json(updObject);
});

export default router;