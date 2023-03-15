import { IUsuario } from "@dao/models/Usuario/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Users {
  private users: IUsuario[];
  private dao: IDataAccessObject;

  constructor(dao: IDataAccessObject) {
    this.dao = dao;
    this.users = [];
  }

  getAll() {
    return this.dao.findAll();
  }

  getById(id: string) {
    return this.dao.findByID(id);
  }

  add(newUser: IUsuario) {
    const date = new Date();
    const newUserObject: IUsuario = {
      ...newUser,
      created: date,
      updated: date
    }
    return this.dao.create(newUserObject);
  }

  update(id: string, updatedUser: IUsuario) {
    const updateObject = { ...updatedUser, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
