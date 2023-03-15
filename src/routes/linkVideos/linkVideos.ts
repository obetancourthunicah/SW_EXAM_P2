import express from 'express';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { LinkVideos } from '@server/libs/LinkVideos/LinkVideos';
import { VideosDao } from '@server/dao/models/linkVideos/VideosDao';

const videosDao = new VideosDao(MongoDBConn);
let videosModel: LinkVideos;

videosDao.init().then(()=>{
    videosModel = new LinkVideos(videosDao);
})

const router = express.Router();

router.post('/linkvideo', async (req, res) => {
    const newVideo = req.body;
    const result = await videosModel.linkVideo(newVideo);
    return res.status(200).json(result);
})


export default router;