import express from 'express';
const router = express.Router();
import { ProductosDao } from '@server/dao/models/Productos/ProductosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IProducto } from '@server/dao/models/Productos/IProductos';
import { Productos } from '@server/libs/Productos/Productos';
const productosDao = new ProductosDao(MongoDBConn);
let productoModel:Productos;
productosDao.init().then(()=>{
  productoModel = new Productos(productosDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "empresas/all"},
    "getById": {"method":"get", "url": "empresas/byid/:id"},
    "new": {"method":"post", "url": "empresas/new"},
    "update": {"method":"put", "url": "empresas/upd/:id"},
    "delete": {"method":"delete", "url": "empresas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await productoModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const empresa = await productoModel.getById(codigo);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró el Producto"});
});

router.post('/new', async (req, res) => {
  const {
    codigo = "NA",
    nombre ="Head&Shoulder",
    descripcion = "Shampoo",
    precio=15,
    stock=10,
    categoria="cuidado"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newProducto: IProducto = {
    codigo,
    nombre,
    descripcion,
    precio,
    stock,
    categoria
  };
  if (await productoModel.add(newProducto)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un nuevo producto"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre ="----NotRecieved------",
    codigo ="----NotRecieved------"
  } = req.body;

  if (
    nombre === "----NotRecieved------" || codigo === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y codigo correctos"});
  }
  const UpdateProducto : IProducto = {
    nombre,
    codigo
  };

  if (await productoModel.update(id, UpdateProducto)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Producto"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await productoModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar el Producto"});
});

export default router;
