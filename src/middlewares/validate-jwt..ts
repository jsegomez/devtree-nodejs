import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt";

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization?.split(' ')[1];

    if (!bearerToken) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const { id } = verifyJWT(bearerToken) ;
        req.body.id = id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default validateJWT;



