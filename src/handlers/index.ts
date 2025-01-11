import { Request, Response } from "express";
import formidable from 'formidable'; 

import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import validateNickname from "../utils/nickname";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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

    const token = generateJWT({ id: user._id });    
    res.status(200).json({ token });
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

const getUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    const user = await User.findById(id).select('-password -__v -_id');
    if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
    }
    
    res.status(200).json(user);
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { nickname, description } = req.body;
    const updateFields: Partial<{ nickname: string; description: string }> = {description, nickname};

    const findByNickName = await findUserByNickname(nickname);

    if (findByNickName && findByNickName._id.toString() !== id) {
        res.status(409).json({ message: "Ya existe un usuario registrado con este nickname" });
        return;
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true }).select('-password -__v -_id');

    if (!user) {
        res.status(404).json({ message: "Credenciales incorrectas" });
        return;
    }

    res.status(200).json(user);
}

const uploadImage = async (req: Request, res: Response) => {
    const { id } = req.body;
    const form = formidable({multiples: false, maxFileSize: 1024 * 1024 * 10});

    try {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error procesando los datos:', err);
                return res.status(400).json({ error: 'Error procesando los datos' });
            }
           
            const image = files.avatar ? files.avatar[0] : null;

            if (!image) {
                return res.status(400).json({ error: 'No se ha encontrado ningún archivo' });
            }else{
                cloudinary.uploader.upload(image.filepath, {}, async function(error, image){
                    if (error) {
                        return res.status(500).json({ error: 'Error al subir la imagen' });
                    }
        
                    if(image){                        
                        const updateFields: Partial<{ image: string }> = {image: image.secure_url};                                                 
                        const user = await User.findByIdAndUpdate(id, updateFields, { new: true }).select('-password -__v -_id');
                        return res.status(200).json(user); 
                    }
                });
            }
        })        
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar los datos', details: error });
    }
}


const findUserByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({ email });
}

const findUserByNickname = async (nickname: string): Promise<User | null> => {
    return await User.findOne({ nickname });
}

export { createUser, authenticateUser, findUserByNickname, getUser, updateUser, uploadImage};



