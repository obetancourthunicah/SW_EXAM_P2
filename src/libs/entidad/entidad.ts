import { IEntidad } from "@server/dao/models/entidad/IEntidad";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";

export class Entidades{
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject){
        this.dao = dao;
    }
    getAll(){
        return this.dao.findAll();
    }
    getById(id: string) {
        return this.dao.findByID(id);
    }
    add(nuevaEntidad: IEntidad) {
        const fecha = new Date();
        const nueva: IEntidad= {
            ...nuevaEntidad,
            createdAt: fecha,
            updatedAt: fecha
        }
        return this.dao.create(nueva);
    }
    update(id: string, updateEntidad: IEntidad) {
        const updateObject = {...updateEntidad, updatedAt: new Date() };
        return this.dao.update(id, updateObject);
    }
    delete(id: string) {
        return this.dao.delete(id);
    }
}