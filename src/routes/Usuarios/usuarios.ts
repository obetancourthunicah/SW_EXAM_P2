import express from 'express';
import { UsuariosDao } from '@dao/models/Usuario/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsuarios } from '@dao/models/Usuario/IUsuarios';
import { Usuarios } from '@libs/Usuarios/Usuarios';

const router = express.Router();
const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel: Usuarios;

usuariosDao.init().then(() => {
  usuariosModel = new Usuarios(usuariosDao);
});

// Register endpoints on router
// http://localhost:3001/usuarios
router.get('/', (_req, res) => {
  const jsonUrls = {
    "getAll": { "method": "get", "url": "usuarios/all" },
    "getById": { "method": "get", "url": "usuarios/byid/:id" },
    "new": { "method": "post", "url": "usuarios/new" },
    "update": { "method": "put", "url": "usuarios/upd/:id" },
    "delete": { "method": "delete", "url": "usuarios/del/:id" },
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await usuariosModel.getAll());
});

router.get('/byid/:id', async (req, res) => {
  const { id: codigo } = req.params;
  const usuario = await usuariosModel.getById(codigo);
  if (usuario) {
    return res.status(200).json(usuario);
  }
  return res.status(404).json({ "error": "No se encontró Usuario" });
});

router.post('/new', async (req, res) => {
  const newUser: IUsuarios = req.body;
  const result = await usuariosModel.create(newUser);
  res.status(201).json(result);
});

router.put('/upd/:id', async (req, res) => {
  const { id: codigo } = req.params;
  const updatedUser: IUsuarios = req.body;
  const result = await usuariosModel.update(codigo, updatedUser);
  res.status(200).json(result);
});

router.delete('/del/:id', async (req, res) => {
  const { id: codigo } = req.params;
  const result = await usuariosModel.delete(codigo);
  res.status(200).json(result);
});

export default router;
