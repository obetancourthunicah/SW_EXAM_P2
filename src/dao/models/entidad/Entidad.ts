import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEntidad } from "./IEntidad";

export class EntidadesDao extends MongoDAOBase<IEntidad>{
  constructor(conexion: IDBConnection){
      super("entidades", conexion);
  }
}
