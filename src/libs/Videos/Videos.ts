import { IVideos } from "@dao/models/Videos/IVideos";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Videos {
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
  add(nuevoVideo: IVideos) {
    const date = new Date();
    const nueva: IVideos = {
      ...nuevoVideo,
      fechaDeCarga: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateVideo: IVideos) {
    const updateObject = { ...updateVideo, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}