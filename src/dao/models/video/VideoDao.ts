import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { Ivideo } from "./IVideo";

export class VideoDao extends MongoDAOBase<Ivideo>{
  constructor(conexion: IDBConnection){
      super("Videos", conexion);
  }
}
