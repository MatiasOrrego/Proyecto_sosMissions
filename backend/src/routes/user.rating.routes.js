import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';
import { addRatingCtrl, getRating, modifyRating } from '../controllers/user.rating.controller.js';

const ratingRouter = Router();

ratingRouter.post('/:postId', validateJwt, addRatingCtrl);
ratingRouter.get('/:postId', validateJwt, getRating);
ratingRouter.put('/:postId', validateJwt, modifyRating);

export { ratingRouter };