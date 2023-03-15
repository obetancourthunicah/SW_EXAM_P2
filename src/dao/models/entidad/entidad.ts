import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEntidad } from "./IEntidad";

export class Entidad extends MongoDAOBase<IEntidad>{
  constructor(conexion: IDBConnection){
      super("entidad", conexion);
  }
}