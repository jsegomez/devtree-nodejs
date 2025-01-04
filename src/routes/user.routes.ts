import { Router } from "express";
import { getUser } from "../handlers";
import validateJWT from "../middlewares/validate-jwt.";

const userRoutes = Router();

userRoutes.get('/data-user', validateJWT, getUser);

export { userRoutes };