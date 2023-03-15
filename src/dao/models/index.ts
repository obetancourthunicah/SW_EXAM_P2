import { MongoDBConn } from '@dao/MongoDBConn';
import {VideosDao} from './Videos/Videos';

const dao = {
  videoDao: new VideosDao(MongoDBConn),
}

export default dao;
