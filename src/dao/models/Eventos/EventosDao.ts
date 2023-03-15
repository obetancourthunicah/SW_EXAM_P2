import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IEventos } from "./IEventos";

export class EventosDao extends MongoDAOBase<IEventos> {
    constructor(conexion: IDBConnection) {
        super('eventos', conexion);
    }
}