import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { ITareas } from "./ITareas";

export class TareasDao extends MongoDAOBase<ITareas>{
  constructor(conexion: IDBConnection){
      super("Tareas", conexion);
  }
}
