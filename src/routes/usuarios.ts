import express from 'express';
const router = express.Router();

import {Usuarios, IUsuario} from '@libs/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    nombre: 'Ernesto Sanchez',
    correo: 'jemsbond@hotmail.com',
    password: "lospanchos",
    roles: 'Admin'
});

router.get('/',(_req, res)=>{
    const jsonUrls = {
        "getAll":{"method":"get","url":"usuarios/all"},
        "getById":{"method":"get","url":"usuarios/byid/:id"},
        "new":{"method":"post","url":"usuarios/new"},
        "update":{"method":"put","url":"usuarios//upd/:id"},
        "delete":{"method":"delete","url":"usuarios//del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all',(_req, res)=>{
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
  const {id: codigo} = req.params;
  const usuario = usuariosModel.getById(codigo);
  if(usuario){
    return res.status(200).json(usuario);
  }
  return res.status(404).json({"error":"No se encontró Usuario"});
});

router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
      nombre ="John Doe Corp",
      correo = "Activo",
      password = "123",
      roles = "Admin"
    } = req.body;
    //TODO: Validar Entrada de datos
    const newUsuario: IUsuario = {
        codigo: "",
        nombre,
        correo,
        password,
        roles
    };
    if (usuariosModel.add(newUsuario)) {
      return res.status(200).json({"created": true});
    }
    return res.status(404).json(
      {"error": "Error al agregar una nuevo Usuario"}
    );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
        nombre ="John Doe Corp",
        correo = "Activo",
        password = "123",
        roles = "Admin"
    } = req.body;
  
    const UpdateUsuario : IUsuario = {
      codigo: id,
      nombre,
      correo,
      password,
      roles
    };
  
    if (usuariosModel.update(UpdateUsuario)) {
      return res
        .status(200)
        .json({"updated": true});
    }
    return res
      .status(404)
      .json(
        {
          "error": "Error al actualizar Usuario"
        }
      );
  });

router.delete('/del/:id', (req, res)=>{
  const {id : codigo} = req.params;
  if(usuariosModel.delete(codigo)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Usuario"});
});
/*
router.get('/',(_req, res){

});
*/

export default router;
