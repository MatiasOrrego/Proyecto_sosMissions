import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import fileupload from 'express-fileupload';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { postRouter } from './routes/post.routes.js';
import { commentRouter } from './routes/comments.routes.js';
import { medicRouter } from './routes/medics.routes.js';
import { errorHandler } from './middleware/error.js';

const app = express();

// Middlewares
app.use(cors());
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
})); 
app.use(morgan('dev'));
app.use(json());
app.use('/', userRouter,);
app.use('/medics', medicRouter);
// Middleware para errores
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
