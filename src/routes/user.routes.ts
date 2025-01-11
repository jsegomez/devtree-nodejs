import { Router } from "express";
import { body } from "express-validator";

import { getUser, updateUser, uploadImage } from "../handlers";
import validateJWT from "../middlewares/validate-jwt.";

const userRoutes = Router();

userRoutes.get('/data-user', validateJWT, getUser);

userRoutes.patch('/update-user',
    body('nickname')
        .isString().withMessage('This field must be a string.')
        .notEmpty().withMessage('This field cannot be empty.')
        .isLength({ min: 2, max: 20 }).withMessage('This field must be between 2 and 20 characters long.')
        .matches(/^[a-z0-9]+([_][a-z0-9]+)*[_]?$/).withMessage('This field must contain only lowercase letters, numbers, and underscores.')
        .trim(),
    body('description')
        .isString().withMessage('This field must be a string.')
        .notEmpty().withMessage('This field cannot be empty.')
        .isLength({ min: 2, max: 100 }).withMessage('This field must be between 2 and 100 characters long.')
        .trim(),
    validateJWT,
    updateUser
);

userRoutes.post('/set-image', validateJWT, uploadImage)               

export { userRoutes };