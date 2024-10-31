import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';
import { createQuestionsCtrl, getAllGeneralQuiz, getQuizByIdCtrl, deleteQuizCtrl, getAllQuizCtrl, getQuizByCategoryCtrl } from '../controllers/question.controller.js';

const questionRouter = Router();

questionRouter.get('/general', getAllGeneralQuiz)
questionRouter.get('/', validateJwt, getAllQuizCtrl);
questionRouter.get('/:id', validateJwt, getQuizByIdCtrl);
questionRouter.get('/category/:categoryId', getQuizByCategoryCtrl)
questionRouter.post('/', validateJwt, createQuestionsCtrl);
questionRouter.delete('/:id', validateJwt, deleteQuizCtrl);

export { questionRouter };