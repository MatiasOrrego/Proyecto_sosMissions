import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { postRouter } from './routes/post.routes.js';
import { commentRouter } from './routes/comments.routes.js';
import { medicRouter } from './routes/medic.routes.js';
import { videoRouter } from './routes/video.routes.js';
import { quizRouter } from './routes/quiz.routes.js';
import { questionRouter } from './routes/question.routes.js';
import { ratingRouter } from './routes/user.rating.routes.js';
import { ratingVideoRouter } from './routes/video.rating.routes.js';
import { createDatabaseAndTables } from '../config/create-database.js';

const app = express();

createDatabaseAndTables();

// Middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use(commentRouter);
app.use('/medic', medicRouter);
app.use('/video', videoRouter);
app.use('/quiz', quizRouter);
app.use('/question', questionRouter);
app.use('/rating', ratingRouter);
app.use('/rating/video', ratingVideoRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
