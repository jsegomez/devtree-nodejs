import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}

export default validateFields;