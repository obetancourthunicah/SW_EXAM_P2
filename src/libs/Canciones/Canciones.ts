import { ICancion } from "@dao/models/Canciones/ICanciones";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Canciones {
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
  
  add(nuevaCancion: ICancion) {
    //const date = new Date();
    const nueva: ICancion = {
      ...nuevaCancion
      /*created: date,
      updated: date*/
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateCancion: ICancion) {
    const updateObject = { ...updateCancion, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
