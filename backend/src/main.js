import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use('/', router);

app.listen(3000, () => {
    console.log('Servidor iniciado');
});
