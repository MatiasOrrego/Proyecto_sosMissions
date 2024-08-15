import { Router } from 'express';
export const router = Router();


postRouter.get('/post', getAllPost);
postRouter.get('/post', getPostById);
postRouter.post('/post', createPost);
postRouter.put('/post', updatePost);
postRouter.delete('/post', deletePost)