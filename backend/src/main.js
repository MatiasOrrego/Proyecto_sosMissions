import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './routes/users.routes.js';
import { postRouter } from './routes/post.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use('/', userRouter);
app.use('/', postRouter)

// app.use(multer({
//     storage: storage,
//     dest: path.join(__dirname, 'public/uploads')
// }).single('image'));

app.listen(3000, () => {
    console.log('Servidor iniciado');
});
