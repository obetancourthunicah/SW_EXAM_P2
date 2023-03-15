import express from 'express';
const router = express.Router();

import { Entidad, IEntidad} from '@libs/entidad/entidad';

const entidadModel = new Entidad();
entidadModel.add({
    codigo: '',
    descripcion: 'Mi Empresa',
    status: 'Activo',
    created: undefined,
    updated: undefined,
    ubicacion: '',
    categoria: ''
})

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get","url": "entidad/all"},
        "getById": {"method": "get", "url": "entidad/byid/:id"},
        "new":{"method":"post","url": "entidad/new"},
        "update":{"method":"put","url": "entidad/upd/:id"},
        "delete":{"method":"delete","url": "entidad/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all',(_req, res)=>{
    res.status(200).json(entidadModel.getAll());
});

router.get('/byId/:id', (req,res)=>{
    const {id : codigo}=req.params;
    const entidad = entidadModel.getById(codigo);
    if (entidad){
        return res.status(200).json(entidad);
    }
    return res.status(404).json({"error":"No se encontro la entidad"});
});

router.post('/new', (req, res) => {
    console.log("Entidad /new request body:", req.body);
    const {descripcion="", } = req.body;
    const newEntidad : IEntidad= {
        codigo: "",
        descripcion,
        created: undefined,
        updated: undefined,
        ubicacion: '',
        categoria: '',
        status: ''
    };
    if (entidadModel.add(newEntidad)){
        res.status(200).json({"created": true});
    }
    return res.status(404).json({"error":"Error al agregar una nueva entidad"});
});

router.put ('/upd/:id', (req,res) =>{
    const {id} = req.params;
    const {descripcion=""} = req.body;
    const updateEntidad : IEntidad = {
        codigo: id,
        descripcion,
        created: undefined,
        updated: undefined,
        ubicacion: '',
        categoria: '',
        status: ''
    };
    
    if (entidadModel.update(updateEntidad)){
        return res.status(200).json({"updated": true});
    }
    return res.status(400).json({"error":"Error al actualizar la entidad"});
});

router.delete('/del/:id', (req, res)=>{
    const {id:codigo} = req.params;
    if(entidadModel.delete(codigo)){
        return res.status(200).json({"deleted":true});
    }
    return res.status(404).json({"error":"No se puede eliminar la entidad"});
});

export default router;