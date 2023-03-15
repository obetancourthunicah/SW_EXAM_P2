import { IProducto } from "@server/dao/models/Productos/IProductos";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Productos {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevoProducto: IProducto) {
    const date = new Date();
    const nueva: IProducto = {
      ...nuevoProducto,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateProducto: IProducto) {
    const updateObject = { ...updateProducto, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
