import { IUsuarios } from "@server/dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class Usuarios {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getById(id: string) {
        return this.dao.findByID(id);
    }

    add(NuevoUsuario: IUsuarios) {
        const nuevo: IUsuarios = {
            ...NuevoUsuario,                        
            ID: (Math.random() * 1000).toString() + new Date().getTime().toString(),
        }
        return this.dao.create(nuevo);
    }

    update(id: string, updateUsuario: IUsuarios) {
        const updateObject = { ...updateUsuario};
        return this.dao.update(id, updateObject);
    }

    delete(id: string){
        return this.dao.delete(id);
    }
}
