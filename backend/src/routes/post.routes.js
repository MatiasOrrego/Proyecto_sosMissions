import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';

import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controllers.js';

router.get('/post', getAllPosts);
router.get('/post/:id', getPostById);
router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

app.use(errorHandler);