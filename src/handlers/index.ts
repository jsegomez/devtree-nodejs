import User from "../models/User";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/auth";
import validateNickname from "../utils/nickname";

const authenticateUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
        res.status(404).json({ message: "Credenciales incorrectas" });
        return;
    }
    
    const isPasswordCorrect = await comparePassword(req.body.password, user.password);
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid password" });
        return;
    } 

    res.status(200).json({ message: "User authenticated successfully" });
}

const createUser = async (req: Request, res: Response) => {
    const { email, nickname } = req.body;
    const userByEMail = await findUserByEmail(email);
    const userByNickname = await findUserByNickname(nickname);
        
    if (userByEMail) {
        res.status(409).json({ message: "Ya existe un usuario registrado con este email" });
        return;
    }

    if (userByNickname) {
        res.status(409).json({ message: "Ya existe un usuario registrado con este nickname" });
        return;
    }

    if (!validateNickname(nickname)) {
        res.status(400).send({ message: "Invalid nickname" });
        return;
    }

    const passwordHash = await hashPassword(req.body.password);
    const newUser = new User({ ...req.body, password: passwordHash });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
}

const findUserByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ email });
}

const findUserByNickname = async (nickname: string): Promise<User | null> => {
    return await User.findOne({ nickname });
}

export { createUser, authenticateUser, findUserByNickname };



