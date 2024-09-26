import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import { userRouter } from './routes/users.routes.js';
import { postRouter } from './routes/post.routes.js';
import { commentRouter } from './routes/comments.routes.js';  // Importar rutas de comentarios

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

// Rutas
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', commentRouter);  // Añadir rutas de comentarios

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
