import { Router } from 'express';
import { createAnnouncementController } from '@controllers/announcements/create-announcement/createAnnouncementController';
import { verifyJWT } from '@/middlewares/verifyJWT/verifyJWT';

const announcementsRouter = Router();

announcementsRouter.route('/').post(verifyJWT, createAnnouncementController);

export default announcementsRouter;
