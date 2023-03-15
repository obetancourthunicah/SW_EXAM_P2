import { MongoDAOBase } from "../../MongoDAOBase";
import { IDBConnection } from "../../IDBConnection";
import { IEvento } from "./IEvento";

export class EventoDao extends MongoDAOBase<IEvento>{
  constructor(conexion: IDBConnection){
      super("evento", conexion);
  }
}
