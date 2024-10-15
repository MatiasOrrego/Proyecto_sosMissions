import { Router } from 'express';
import { signUpMedicCtrl } from '../controllers/medic.controllers.js';

const medicRouter = Router();

medicRouter.post("/sign-in", signUpMedicCtrl);


export { medicRouter }