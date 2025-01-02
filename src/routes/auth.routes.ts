import { Router } from 'express';
import { createUser, authenticateUser } from '../handlers';
import { body } from 'express-validator';

import validateFields from '../middlewares/validate-fields';

const authRoutes = Router();

authRoutes.post('/login', 
    body('email')
        .notEmpty().withMessage('This field cannot be empty.')        
        .trim(),
    body('password')
        .isLength({ min: 8 }).withMessage('This field must be at least 8 characters long.')
        .trim(),
    validateFields,
    authenticateUser
);

authRoutes.post(
    '/register',
    body('nickname')
        .isString().withMessage('This field must be a string.')
        .notEmpty().withMessage('This field cannot be empty.')
        .isLength({ min: 2, max: 20 }).withMessage('This field must be between 2 and 20 characters long.')
        .matches(/^[a-z0-9]+([_][a-z0-9]+)*[_]?$/).withMessage('This field must contain only lowercase letters, numbers, and underscores.')
        .trim(),
    body('name')
        .isString().withMessage('This field must be a string.')
        .notEmpty().withMessage('This field cannot be empty.')
        .isLength({ min: 2, max: 15 }).withMessage('This field must be between 2 and 15 characters long.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).withMessage('This field must contain only letters.')
        .trim(),
    body('lastname')
        .isString().withMessage('This field must be a string.')
        .notEmpty().withMessage('This field cannot be empty.')
        .isLength({ min: 2, max: 15 }).withMessage('This field must be between 2 and 15 characters long.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/).withMessage('This field must contain only letters.')
        .trim(),
    body('email')
        .isEmail().withMessage('This field must be a valid email address.')
        .notEmpty().withMessage('This field cannot be empty.')
        .trim(),
    body('password')
        .isLength({ min: 8 }).withMessage('This field must be at least 8 characters long.')
        .trim(),
    validateFields,
    createUser);

export default authRoutes;