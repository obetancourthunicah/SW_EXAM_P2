import { IProductos } from '@server/dao/models/Productos/IProductos';
import { IDataAccessObject } from '@dao/IDataAccessObject';

export class Productos {
  private dao: IDataAccessObject;
  private productos: IProductos[];
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(codigo: string) {
    return this.dao.findByID(codigo);
  }

  add(nuevoProducto: IProductos) {
    const nueva: IProductos = {
      ...nuevoProducto,
    };
    return this.dao.create(nueva);
  }

  update(codigo: string, updateProducto: IProductos) {
    const updateObject = { ...updateProducto };
    return this.dao.update(codigo, updateObject);
  }

  delete(codigo: string) {
    return this.dao.delete(codigo);
  }
}
