import { postRouter } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';



import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controllers.js';

postRouter.get('/post', getAllPosts);
postRouter.get('/post/:id', getPostById);
postRouter.post('/post', createPost);
postRouter.put('/post/:id', updatePost);
postRouter.delete('/post/:id', deletePost);

export { postRouter };

app.use(errorHandler);