import express from "express";
const router = express.Router();
import { PlantaDao } from "@dao/models/plantas/PlantasDao";
import { MongoDBConn } from "@dao/MongoDBConn";
import { IPlantas } from "@dao/models/plantas/IPlantas";
import { Plantas } from "@libs/plantas/plantas";

const plantaDao = new PlantaDao(MongoDBConn);
let plantaModel: Plantas;

plantaDao.init().then(()=>{
    plantaModel = new Plantas(plantaDao);
})

router.get('/', (_req, res)=>{
    const jsonUrls ={
        "getAll": {"method":"get", "url":"plantas/all"},
        "getById": {"method":"get", "url":"plantas/byid/:id"},
        "new":{"method":"post", "url":"plantas/new"},
        "update": {"method":"put", "url":"plantas/upd/:id"},
        "delete":{"method":"delete", "url":"plantas/del/:id"}
    }
    res.status(200).json(jsonUrls);
});

router.get('/all',async (req, res) => {
    const {id:codigo} = req.params;
    const planta = await plantaModel.getById(codigo);

    if(planta){
        return res.status(200).json(planta);
    }
    return res.status(404).json({"Error 404": "El registro de la planta ornamental no fué encontrado"});
});

router.post('/new',async(req, res)=>{
    console.log("Plantas /new req body:", req.body);

    const{
        codigo= "NA",
        nombre_cientifico= "NombreCientifico",
        nombre_comun= "PlantitaPequeña",
        descripcion= "Esta es una planta en mi patio",
        cuidados= "NA",
        luz_solar= "Mucha Luz solar",
        riego_requeridos= "Mucha Agua por la noche"
    }= req.body;

    const newplanta:IPlantas={
        codigo,
        nombre_cientifico,
        nombre_comun,
        descripcion,
        cuidados,
        luz_solar,
        riego_requeridos,
    }

    if (await plantaModel.add(newplanta)){
        return res.status(200).json({"created":true});
    }
    
       return res.status(404).json(
        {"error":"No se pudo crear el nuevo registro"}
       );
});