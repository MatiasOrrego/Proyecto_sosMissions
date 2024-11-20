import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';
import { addRatingVideoCtrl } from '../controllers/user.rating.video.controller.js';

const ratingVideoRouter = Router();

ratingVideoRouter.post('/:videoId', validateJwt, addRatingVideoCtrl);

export { ratingVideoRouter };