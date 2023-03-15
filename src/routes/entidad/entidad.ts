import express from 'express';
const router = express.Router();

import { EntidadDao } from '@server/dao/models/entidad/Entidad';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { IEntidad } from '@server/dao/models/entidad/IEntidad';
import { Entidades } from '@server/libs/entidad/entidad';

const entidadDao = new EntidadDao(MongoDBConn);
let entidadModel: Entidades;
entidadDao.init().then(()=>{
    entidadModel = new Entidades(entidadDao);
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
    return res.status(404).json({"error":"No se encontró la entidad"});
  });

router.post('/new', async (req, res) => {
    console.log("Entidades /new request body:", req.body);
    const {
      nombre ="Un Usuario",
      correo = "123@gmail.com",
      password = "12345"
    } = req.body;
    //TODO: Validar Entrada de datos
    const newEntidad: IEntidad = {
      nombre,
      correo,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (await entidadModel.add(newEntidad)) {
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
      password="----NotRecieved------",
      correo = ""
    } = req.body;
  
    if (
      nombre === "----NotRecieved------"
      || password === "----NotRecieved------"
    ) {
      return res.status(403).json({"error":"Debe venir el nombre y contraseña correctos"});
    }
    const UpdateEntidad : IEntidad = {
        nombre,
        correo,
        password,
        createdAt: new Date(),
        updatedAt: new Date()
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
          "error": "Error al actualizar la Entidad"
        }
      );
  });

  router.delete('/del/:id', async (req, res)=>{
    const {id } = req.params;
    if(await entidadModel.delete(id)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
  });



  export default router;