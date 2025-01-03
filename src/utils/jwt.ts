import jwt, { JwtPayload} from 'jsonwebtoken';

export const generateJWT = () => {
    return jwt.sign({}, process.env.JWT_SECRET!, { expiresIn: '1h' });        
}

export const verifyJWT = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
}