import dao from '@dao/models';
import { Videos } from '@libs/videos.libs';
dao.videoDao.init().then(()=>{libs.VIDEOS});

const libs = {
    VIDEOS : new Videos(dao.videoDao)
}

export default libs
