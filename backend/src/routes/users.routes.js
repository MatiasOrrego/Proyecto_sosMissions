import { Router } from 'express';
import {userController} from '../controllers/users.controller.js';
    
const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/session', userController.session);
userRouter.get('/logout', userController.logout);


export { userRouter };