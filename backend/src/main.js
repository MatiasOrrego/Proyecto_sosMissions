import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileupload from 'express-fileupload'
import { userRouter } from './routes/users.routes.js';
import { postRouter } from './routes/post.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))
app.use('/', userRouter);
app.use('/', postRouter)

app.listen(3000, () => {
    console.log('Servidor iniciado');
});
