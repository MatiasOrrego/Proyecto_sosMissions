import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { postRouter } from './routes/post.routes.js';
import { commentRouter } from './routes/comments.routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);
app.use(helmet())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
);
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({ message: 'Internal server error' });
});

// Rutas
app.use("/auth", authRouter);
app.use('/post', postRouter);
app.use(commentRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
