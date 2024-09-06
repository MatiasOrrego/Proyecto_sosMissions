import { Router } from 'express';
export const userRouter = Router();

import {
    register,
    login,
    session,
    logout
} from '../controllers/users.controller.js';

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.get('/session', session)

userRouter.post('/logout', logout)