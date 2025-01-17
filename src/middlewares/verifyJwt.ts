import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

class JwtVerifier {
    public secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public verify(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers['x-access-token'] as string;
        if (!token) {
            res.status(401).json({ msg: 'Access denied, token missing' });
        } else {
            console.log(this.secret);
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: 'Access denied, token invalid' });
                } else {
                    req.userId = (decoded as any).UserInfo.id;
                    next();
                }
            });
        }
    }
}

const jwtVerifier = new JwtVerifier(process.env.ACCESS_TOKEN_SECRET as string);
export const verifyJWT = jwtVerifier.verify.bind(jwtVerifier);