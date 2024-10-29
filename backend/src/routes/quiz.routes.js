import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';

const quizRouter = Router();

quizRouter.get('/general', getAllGeneralPost)
quizRouter.get('/', validateJwt, getAllPostsCtrl);
quizRouter.get('/:id', validateJwt, getPostByIdCtrl);
quizRouter.get('/category/:categoryId', getPostByCategoryCtrl)
quizRouter.post('/', validateJwt, createPostCtrl);
quizRouter.delete('/:id', validateJwt, deletePostCtrl);

export { postRouter };