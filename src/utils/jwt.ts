import jwt, { JwtPayload} from 'jsonwebtoken';

export const generateJWT = (id: JwtPayload) => {
    return jwt.sign(id , process.env.JWT_SECRET!, { expiresIn: '1h' });        
}

export const verifyJWT = (token: string):JwtPayload => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}


