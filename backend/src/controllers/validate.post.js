import {body, validationResult} from 'express-validator';

export const validatePost = [
    body("title").trim().isString().isLength({min: 1}).escape(),
    body("description").trim().isString().isLength({min: 1}).escape(),
    body("image").trim().isURL(),
];