import { IPlantas } from "@dao/models/plantas/IPlantas";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Plantas {
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
  add(nuevaPlanta: IPlantas) {
    const date = new Date();
    const nueva: IPlantas = {
      ...nuevaPlanta,
      created: date,
    }
    return this.dao.create(nueva);
  }

  update(id: string, updatePlanta: IPlantas) {
    const updateObject = { ...updatePlanta};
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
