import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IVideos } from "@dao/models/linkVideos/IVideos";

export class VideosDao extends MongoDAOBase<IVideos>{
    constructor(conexion: IDBConnection){
        super("videos", conexion);
    }
}