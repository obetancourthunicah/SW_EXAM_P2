import { Router } from 'express';
import videos from './videos.routes';

const router = Router();

router.use('/videos', videos);

export default router;
