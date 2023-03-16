import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IAuditable } from "./IAuditable";

export class AuditableDao extends MongoDAOBase<IAuditable>{
  constructor(conexion: IDBConnection){
      super("canciones", conexion);
  }
}