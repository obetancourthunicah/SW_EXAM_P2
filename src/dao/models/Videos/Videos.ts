import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IVideos } from "./IVideos";
import { IDBConnection } from "@dao/IDBConnection";

export class VideosDao extends MongoDAOBase<IVideos>{
    constructor(conexion: IDBConnection){
        super("videos", conexion);
    }
}
