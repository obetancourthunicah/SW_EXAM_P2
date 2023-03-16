import { Ivideo } from "@dao/models/video/IVideo";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Videos {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
      this.dao = dao;}


getAll(){
    return this.dao.findAll();
}

getById(codigo: string) {
    return this.dao.findByID(codigo);
}

delete(id: string){
    return this.dao.delete(id);
}
}

