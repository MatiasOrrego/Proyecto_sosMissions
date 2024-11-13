import { Router } from 'express';
import { getUserMedicCtrl, signUpMedicCtrl } from '../controllers/medic.controllers.js';

const medicRouter = Router();

medicRouter.post("/sign-in", signUpMedicCtrl);
medicRouter.get("/:id", getUserMedicCtrl);


export { medicRouter }