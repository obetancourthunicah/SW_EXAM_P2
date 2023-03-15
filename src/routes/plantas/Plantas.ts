import express from 'express';
const router = express.Router();

import { Plantas} from '@libs/plantas/Plantas';
import { IPlantas } from '@dao/models/plantas/IPlantas';
import { PlantasDao } from '@dao/models/plantas/PlantasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
const plantasDao = new PlantasDao(MongoDBConn)
let plantasModel:Plantas;
plantasDao.init().then(()=>{
    plantasModel = new Plantas(plantasDao);
});



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
    const planta = await plantasModel.getById(codigo);
    if(planta){
        return res.status(200).json(planta);
    }
    return res.status(404).json({"error":"No se encontró Usuario"});
});


router.post('/new', async (req, res) => {
    console.log("Plantas /new request body:", req.body);
    const {
        nombreCientifico = "--NO DATA",
        nombreComun = "--NO DATA",
        descripcion = "--NO DATA",
        cuidados = "--NO DATA",
        luzSolar = "--NO DATA"
    } = req.body;

    if (( nombreCientifico=== "--NO DATA") || (nombreComun === "--NO DATA") || (descripcion === "--NO DATA") || (cuidados === "--NO DATA") || (luzSolar === "--NO DATA") ){
        return res.status(403).json({"error": "Faltan datos para guardar planta"});
    }

    const newPlanta: IPlantas = {
        nombreCientifico,
        nombreComun,
        descripcion,
        cuidados,
        luzSolar
    };

    if (await plantasModel.add(newPlanta)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar una nueva planta"}
    );
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;

    const {
        nombreCientifico = "--NO DATA",
        nombreComun = "--NO DATA",
        descripcion = "--NO DATA",
        cuidados = "--NO DATA",
        luzSolar = "--NO DATA",
        riegoRequeridos = "SI"
    } = req.body;

    if (( nombreCientifico=== "--NO DATA") || (nombreComun === "--NO DATA") || (descripcion === "--NO DATA") || (cuidados === "--NO DATA") || (luzSolar === "--NO DATA") ){
        return res.status(403).json({"error": "Faltan datos para guardar planta"});
    }

    const UpdatePlanta : IPlantas = {
        nombreCientifico,
        nombreComun,
        descripcion,
        cuidados,
        luzSolar, 
        riegoRequeridos
    };
        
    if (await plantasModel.update(id, UpdatePlanta)) {
        return res
        .status(200)
        .json({"updated": true});
    }
    return res
        .status(404)
        .json(
        {
        "error": "Error al actualizar Planta"
    }
        );
    });

router.delete('/del/:id', async (req, res)=>{  
        const {id : codigo} = req.params;
        if(await plantasModel.delete(codigo)){
    return res.status(200).json({"deleted": true});
}
return res.status(404).json({"error":"No se pudo eliminar la planta"});
});

    export default router;