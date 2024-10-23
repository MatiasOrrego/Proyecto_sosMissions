import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';

import {
    getAllPostsCtrl,
    getPostByIdCtrl,
    createPostCtrl,
    deletePostCtrl,
    getAllGeneralPost
} from '../controllers/post.controllers.js';

const postRouter = Router();

postRouter.get('/general', getAllGeneralPost)
postRouter.get('/', validateJwt, getAllPostsCtrl);
postRouter.get('/:id', validateJwt, getPostByIdCtrl);
postRouter.post('/', validateJwt, createPostCtrl);
postRouter.delete('/:id', validateJwt, deletePostCtrl);

export { postRouter };