import { Router } from 'express';
import { validateJwt } from '../middlewares/validarJWT.js';
import { createQuestionsWithOptionsCtrl, getAllGeneralQuestionsCtrl, getAllOptionsByQuestionIdCtrl, getQuestionByQuizIdCtrl } from '../controllers/question.controller.js';

const questionRouter = Router();

questionRouter.get('/general', getAllGeneralQuestionsCtrl);
questionRouter.get('/options/:questionId', validateJwt, getAllOptionsByQuestionIdCtrl)
questionRouter.get('/:quizId', getQuestionByQuizIdCtrl);
questionRouter.post('/', validateJwt, createQuestionsWithOptionsCtrl);

export { questionRouter };