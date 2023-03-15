import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEvento } from "./IEventos";

export class EventosDao extends MongoDAOBase<IEvento>{
  constructor(conexion: IDBConnection){
      super("eventos", conexion);
  }
}