import express from 'express';
const router = express.Router();
import { Ivideo } from '@server/dao/models/video/IVideo';
import { VideoDao } from '@server/dao/models/video/VideoDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { Videos } from '@server/libs/Video/Video';

const VideoDao = new VideoDao(MongoDBConn);

let ModeloVideo:Videos;
VideoDao.init().then(() =>{
    ModeloVideo = new Vide(usuariosDao);
})