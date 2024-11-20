import { Router } from 'express';
import { getAllCommentsCtrl, getCommentByIdCtrl, createCommentCtrl, deleteCommentCtrl, getCommentVideoByIdCtrl, createCommentVideoCtrl } from '../controllers/comments.post.controller.js';
import { validateJwt } from '../middlewares/validarJWT.js';

const commentRouter = Router();

// Publicaciones
commentRouter.get('/comment', getAllCommentsCtrl);
commentRouter.post('/post/:postId/comment', validateJwt, createCommentCtrl);
commentRouter.get('/post/:postId/comment', getCommentByIdCtrl);
commentRouter.delete('comment/:id', validateJwt, deleteCommentCtrl);

// videos
commentRouter.get('/video/:videoId/comment', getCommentVideoByIdCtrl);
commentRouter.post('/video/:videoId/comment', validateJwt, createCommentVideoCtrl)

export { commentRouter }