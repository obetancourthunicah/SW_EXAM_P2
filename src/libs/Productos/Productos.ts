import { IProductos } from "@server/dao/models/Productos/IProductos";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class Usuarios {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getById(id: string) {
        return this.dao.findByID(id);
    }

    add(NuevoProducto: IProductos) {
        const nuevo: IProductos = {
            ...NuevoProducto,                        
            ID: (Math.random() * 1000).toString() + new Date().getTime().toString(),
        }
        return this.dao.create(nuevo);
    }

    update(id: string, updateProductos: IProductos) {
        const updateObject = { ...updateProductos};
        return this.dao.update(id, updateObject);
    }

    delete(id: string){
        return this.dao.delete(id);
    }
}