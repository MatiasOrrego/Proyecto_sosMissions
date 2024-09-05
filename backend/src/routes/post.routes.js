import { Router } from 'express';
export const postRouter = Router();

import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controllers.js';

postRouter.get('/post', getAllPosts);
postRouter.get('/post', getPostById);
postRouter.post('/post', createPost);
postRouter.put('/post', updatePost);
postRouter.delete('/post', deletePost)