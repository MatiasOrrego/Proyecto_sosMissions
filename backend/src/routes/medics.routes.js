import { Router } from 'express';
import { medicController } from '../controllers/medics.controllers.js';

const medicRouter = Router();

medicRouter.post('/register', medicController.register);
medicRouter.post('/login', medicController.login);
medicRouter.get('/session', medicController.session);
medicRouter.get('/logout', medicController.logout);

export { medicRouter };