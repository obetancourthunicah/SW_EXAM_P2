import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { VideosDao } from "@server/dao/models/linkVideos/VideosDao";
import { IVideos, DefaultVideos } from "@dao/models/linkVideos/IVideos";


export class LinkVideos{
    private videosDao: VideosDao;
    constructor(videosLink:IDataAccessObject){
        this.videosDao = videosLink as VideosDao;
    }

    public async linkVideo(video: IVideos){
        try {
            const newVideo: IVideos = {
                ...DefaultVideos,
                ...video
            }
            const result = await this.videosDao.create(newVideo);
            console.log('newVideo result:', result);
            const rt = await this.videosDao.findByFilter({_id: result?.insertedId});
            return rt;
        } catch (error) {
            console.error('newVideo error: ', error);
            return null;
        }
    }

    public async playVideoById(id: string){
        try {
            return this.videosDao.findByID(id);
        } catch (error) {
            console.error('linkedVideo error: ', error);
            return null;
        }
    }

    public async updateVideo(id: string, updateCmd: Partial<IVideos>){
        await this.videosDao.update(id, updateCmd);
        const updatedVideo = await this.videosDao.findByID(id);
        return updatedVideo;
    }
}