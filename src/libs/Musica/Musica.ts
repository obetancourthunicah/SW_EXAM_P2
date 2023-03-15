import { IMusica } from "@dao/models/Musica/IMusica";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Musica {
  
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
  add(nuevaMusica: IMusica) {
    const date = new Date();
    const nueva: IMusica = {
      ...nuevaMusica,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, UpdateMusica: IMusica) {
    const updateObject = { ...UpdateMusica, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}


