import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { ICancion } from "./ICanciones";

export class CancionesDao extends MongoDAOBase<ICancion>{
  constructor(conexion: IDBConnection){
      super("canciones", conexion);
  }
}