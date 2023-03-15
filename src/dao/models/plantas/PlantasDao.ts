import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IPlantas } from "./IPlantas";

export class PlantaDao extends MongoDAOBase<IPlantas>{
    constructor(conexion: IDBConnection){
        super("plantas", conexion);
    }
}