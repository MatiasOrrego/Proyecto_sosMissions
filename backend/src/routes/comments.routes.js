import { Router } from 'express';
import { getAllCommentsCtrl, getCommentByIdCtrl, createCommentCtrl, deleteCommentCtrl } from '../controllers/comments.controllers.js';
import { validateJwt } from '../middlewares/validarJWT.js';

const commentRouter = Router();

commentRouter.get('/comment', getAllCommentsCtrl);
commentRouter.post('/post/:postId/comment', validateJwt, createCommentCtrl);
commentRouter.get('/post/:postId/comment', getCommentByIdCtrl);
commentRouter.delete('comment/:id', validateJwt, deleteCommentCtrl)

export { commentRouter }