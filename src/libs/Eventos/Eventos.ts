import { IEvento } from "@dao/models/Eventos/IEventos";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Eventos {
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
  add(nuevoEvento: IEvento) {
    const date = new Date();
    const nuevo: IEvento = {
      ...nuevoEvento,
      created: date,
      updated: date
    }
    return this.dao.create(nuevo);
  }

  update(id: string, updateEvento: IEvento) {
    const updateObject = { ...updateEvento, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
