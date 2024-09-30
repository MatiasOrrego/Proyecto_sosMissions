import { Router } from 'express';
import { getAllCommentsCtrl, getCommentByIdCtrl, createCommentCtrl, deleteCommentCtrl } from '../controllers/comments.controllers.js';
import { validateJwt } from '../middlewares/validarJWT.js';

const commentRouter = Router();

commentRouter.get('/', validateJwt, getAllCommentsCtrl);
commentRouter.post('/', validateJwt, createCommentCtrl);
commentRouter.get('/', validateJwt, getCommentByIdCtrl);
commentRouter.delete('/:id', validateJwt, deleteCommentCtrl)

export { commentRouter }