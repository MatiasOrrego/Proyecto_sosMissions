import { Router } from 'express';
import {controller} from '../controllers/users.controller.js';
    
const userRouter = Router();

userRouter.post('/register', controller.register);
userRouter.post('/login', controller.login);
userRouter.get('/session', controller.session);
userRouter.get('/logout', controller.logout);


export { userRouter };