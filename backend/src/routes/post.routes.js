import { Router } from 'express';
export const router = Router();

import {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controllers.js';

postRouter.get('/post', getAllPost);
postRouter.get('/post', getPostById);
postRouter.post('/post', createPost);
postRouter.put('/post', updatePost);
postRouter.delete('/post', deletePost)