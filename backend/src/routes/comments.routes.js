import { Router } from 'express';
import { addComment, getCommentsByPost, getAllComments } from '../controllers/comments.controllers.js';

export const commentRouter = Router();
commentRouter.get('/comments', getAllComments);


// Ruta para agregar un comentario a una publicación
commentRouter.post('/comments', addComment);

// Ruta para obtener los comentarios de una publicación específica
commentRouter.get('/comments/:postId', getCommentsByPost);