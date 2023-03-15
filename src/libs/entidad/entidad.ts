import { IEntidad } from "@dao/models/entidad/IEntidad";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class entidad {
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
  add(nuevaEntidad: IEntidad) {
    const date = new Date();
    const nueva: IEntidad = {
      ...nuevaEntidad,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateEntidad: IEntidad) {
    const updateObject = { ...updateEntidad, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}