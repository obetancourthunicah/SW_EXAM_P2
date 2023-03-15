import { Router } from 'express';
import { addVideo, deleteVideo, findAll, getByID, updateVideo} from '@controllers/videos.controller';
const router = Router();

router.get('/all', findAll);
router.get('/byId/:id', getByID);
router.post('/add', addVideo);
router.patch('/update/:id', updateVideo);
router.delete('/delete/:id', deleteVideo);


export default router;