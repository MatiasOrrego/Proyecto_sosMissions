import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';
import { createQuizCtrl, deleteQuizCtrl, getAllGeneralQuiz, getAllQuizCtrl, getQuizByCategoryCtrl, getQuizByIdCtrl } from '../controllers/quiz.controller.js';

const quizRouter = Router();

quizRouter.get('/general', getAllGeneralQuiz)
quizRouter.get('/', validateJwt, getAllQuizCtrl);
quizRouter.get('/:id', validateJwt, getQuizByIdCtrl);
quizRouter.get('/category/:categoryId', getQuizByCategoryCtrl)
quizRouter.post('/', validateJwt, createQuizCtrl);
quizRouter.delete('/:id', validateJwt, deleteQuizCtrl);

export { quizRouter };