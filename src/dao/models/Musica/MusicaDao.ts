import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IMusica } from "./IMusica";

export class MusicaDao extends MongoDAOBase<IMusica>{
  constructor(conexion: IDBConnection){
      super("Musica", conexion);
      
  }
}