import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IVideos } from "./IVideos";

export class VideosDao extends MongoDAOBase<IVideos>{
  constructor(conexion: IDBConnection){
      super("videos", conexion);
  }
}
