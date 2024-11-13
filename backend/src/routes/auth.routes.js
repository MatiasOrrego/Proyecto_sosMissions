import { Router } from 'express';
import {
  signInCtrl,
  getMeCtrl,
  signUpCtrl,
  signOutCtrl,
  getUserByIdCtrl
} from '../controllers/auth.controller.js';
import { validateJwt } from '../middlewares/validarJWT.js';

const authRouter = Router()

authRouter.post("/sign-in", signInCtrl);

authRouter.post("/sign-up",  signUpCtrl);

authRouter.post("/sign-out", validateJwt, signOutCtrl);

authRouter.get("/me", validateJwt, getMeCtrl);

authRouter.get("/:id", getUserByIdCtrl);

export { authRouter }