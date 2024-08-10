import { Router } from 'express';
export const router = Router();

import {
    register,
    login
} from '../controllers/users.controller.js';

router.post('/register', register);

router.post('/login', login);