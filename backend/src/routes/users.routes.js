import { Router } from 'express';
export const userRouter = Router();

import {
    register,
    login
} from '../controllers/users.controller.js';

userRouter.post('/register', register);

userRouter.post('/login', login);

app.use(errorHandler);