import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IMusic, DefaultMusic } from "./IMusic";

export class MusicDao extends MongoDAOBase<IMusic>{
    constructor(conexion:IDBConnection){
        super("music",conexion);
    }
    public async create( music: Partial<IMusic>){
        const newMusic = {...DefaultMusic, ...music};
        return super.create(newMusic);
      }
}