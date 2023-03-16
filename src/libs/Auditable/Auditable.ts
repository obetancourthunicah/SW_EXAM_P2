import { IAuditable } from "@server/dao/models/IAuditable";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class Auditable {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getById(id: string) {
        return this.dao.findByID(id);
    }

    add(Nuevacancion: IAuditable) {
        const nuevo: IAuditable = {
            ...Nuevacancion,
            Id: (Math.random() * 1000).toString() + new Date().getTime().toString(),
        }
        return this.dao.create(nuevo);
    }

    update(id: string, updatecancion: IAuditable) {
        const updateObject = { ...updatecancion};
        return this.dao.update(id, updateObject);
    }

    delete(id: string){
        return this.dao.delete(id);
    }
}