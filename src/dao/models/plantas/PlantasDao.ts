import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IPlantas } from "./IPlantas";

export class PlantasDao extends MongoDAOBase<IPlantas>{
constructor(conexion: IDBConnection){
    super("plantas", conexion);
}
}
