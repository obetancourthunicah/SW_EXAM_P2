import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEntidad } from "./IEntidad";

export class EntidadDao extends MongoDAOBase<IEntidad>{
    constructor(conexion: IDBConnection){
        super("entidades", conexion);
    }
}