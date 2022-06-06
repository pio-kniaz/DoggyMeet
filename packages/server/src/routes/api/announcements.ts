import { Router } from 'express';
import { createAnnouncementController } from '@controllers/announcements/create-announcement/createAnnouncementController';
import { getAllAnnouncementsController } from '@controllers/announcements/get-all-announcements/getAllAnnouncementsController';
import { verifyJWT } from '@/middlewares/verifyJWT/verifyJWT';

const announcementsRouter = Router();

announcementsRouter.route('/').post(verifyJWT, createAnnouncementController);
announcementsRouter.route('/').get(getAllAnnouncementsController);

export default announcementsRouter;
