import { Router } from 'express';
import upload from '../middlewares/multer.js';
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
postRouter.post('/post', upload.single('image'), createPost);
postRouter.put('/post', updatePost);
postRouter.delete('/post', deletePost)