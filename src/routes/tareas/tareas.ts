import express from 'express';
const router = express.Router();
import { TareasDao } from '@dao/models/tareas/TareasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { ITareas } from '@dao/models/tareas/ITareas';
import { Tareas } from '@libs/Tareas/Tareas';
const tareasDao = new TareasDao(MongoDBConn);
let TareasModel:Tareas;
tareasDao.init().then(()=>{
  TareasModel = new Tareas(tareasDao);
});

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "add":{"method":"post", "url":"tarea/new"},
        "getAll": {"method":"get", "url":"tarea/all"},
        "getById": {"method":"get", "url":"tarea/byid/:id"},
        "update": {"method":"put", "url":"tarea/upd/:id"},
        "delete":{"method":"delete", "url":"tarea/del/:id"}
    }
    res.status(200).json(jsonUrls);

});

router.post('/add', async (req, res)=>{
    console.log("tareas /new request body:", req.body);
    const {
        codigo="NA",
        descripcion="crear nuevo modulo",
        estado="proceso",
        nombre="crear",
        fechavencimiento= new Date()
    } = req.body;
    const addTarea: ITareas = {
        descripcion,
        estado,
        nombre,
        fechavencimiento,
        createdAt: new Date(),
        updatedAt: new Date(),
        codigo
    }
    if (await TareasModel.add(addTarea)){ 
        return res.status(200).json({"creado":true});
    }
    return res.status(404).json(
        {"error":"Error al tratar agregar una nueva tarea"});
});
router.get('/all', async(_req, res)=>{
    res.status(200).json(await TareasModel.getAll());
    });

router.get('/byid/:id',async(req,res)=>{
    const {id:codigo}=req.params;
    const tarea= await TareasModel.getById(codigo);
    if(tarea){
        return res.status(200).json(tarea);
    }
    return res.status(404).json({"Error":"No se encontro tarea"});

});


router.put('/upd/:id', async(req, res)=>{
    const {id} =req.params;
    const {
        estado="--NotRecieved----",
        nombre="--NotRecieved----",
        fechavencimiento="--NotRecieved----",
        descripcion="",
    }=req.body;

    if (
        nombre === "--NotRecieved----"
        || estado === "--NotRecieved----"
        || fechavencimiento === "--NotRecieved----"
      ) {
        return res.status(403).json({"error":"Debe venir el nombre, estado y fechavencimiento correctos para poder hacer cambio"});
      }

    const updatetarea: ITareas={
        descripcion,
        estado,
        nombre,
        fechavencimiento,
        codigo: '',
        createdAt: new Date(),
        updatedAt:new Date()
    };

    if(await TareasModel.update(id,updatetarea)){
       return res.status(200).json({"actualizado": true});
    }
    return res.status(404).json({"error": "Error al registrar una tarea"});
})

router.delete('/del/:id', async (req,res)=>{
    const {id:codigo}=req.params;
    if(await TareasModel.delete(codigo)){
        return res.status(200).json({"Borrado":true});
    }
    return res.status(404).json({"error":"No se pudo eliminar la tarea"})
})
export default router;