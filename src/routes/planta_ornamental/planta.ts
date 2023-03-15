import express from 'express';
const router = express.Router();

import { Planta, IPlanta } from '@server/libs/Planta_ornamental/Planta';

const plantaModel = new Planta();

plantaModel.add({
    codigo: '',
    nombre_cientifico: '',
    nombre_comun: '',
    descripcion: '',
    cuidados: '',
    luz_zolar: '',
    riesgo_requerido: ''
   
});

router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get","url": "planta/all"},
        "getById": {"method":"get","url": "planta/byid/:id"},
        "new": {"method":"post","url": "planta/new"},
        "update": {"method":"put","url": "planta/upd/:id"},
        "delete": {"method":"delete","url": "planta/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(plantaModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = plantaModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontro Usario"});
});

router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body)
    const {
        nombre_cientifico= "",
    nombre_comun= "",
    descripcion= "",
    cuidados= "",
    luz_zolar= "",
    riesgo_requerido= ""
    } = req.body;
    //TODO: Validar entrada de datos
    const newUsuarios: IPlanta = {
        codigo : "",
        nombre_cientifico,
        nombre_comun,
        descripcion,
        cuidados,
        luz_zolar,
        riesgo_requerido
        
    };
    if (plantaModel.add(newUsuarios)){
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar un nuevo usuario"}
    );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;

    const updateUsario : IPlanta = {
    codigo: '',
    nombre_cientifico: '',
    nombre_comun: '',
    descripcion: '',
    cuidados: '',
    luz_zolar: '',
    riesgo_requerido: ''
        
    };

    if (plantaModel.update(updateUsario)) {
        return res
        .status(200)
        .json({"updated": true}); 
    }
    return res
    .status(404)
    .json(
        {
            "error": "Error al actualizar Usuarios"
        }
    );
});

router.delete('/del/:id', (req, res)=>{
    const {id : codigo} = req.params;
    if(plantaModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Uusuario"})
});


export default router;