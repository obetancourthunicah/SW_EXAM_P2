import { IVideos } from '@server/dao/models/Videos/IVideos';
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Videos {

    private dao: IDataAccessObject;
    constructor(dao:IDataAccessObject){
        this.dao = dao;
    }

    public async getAll(){
        return await  this.dao.findAll();
    }

    public async getById(id : string){
        try {
          const video = await this.dao.findByID(id);
          if(!video){
              return false;
          }
          return video;
        } catch (error) {
          console.error(error);
        }
    }

    public async add(nuevoVideo : IVideos){
        const date = new Date();
        const nueva : IVideos = {
            ...nuevoVideo,
            createdAt: date,
            updatedAt: date
        }

        return await this.dao.create(nueva);
    }

    public async update(id: string, changes : IVideos){

        const updateVideo = {...changes, updatedAt: new Date()}

        return await this.dao.update(id,updateVideo);
    }

    public async delete (deleteVideo : string){
        const video = this.getById(deleteVideo);

        if(video){
            return await this.dao.delete(deleteVideo);
        }
        return false;
    }
}
