import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use('/', userRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado');
});
