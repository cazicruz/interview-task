import { prismaClient } from '..';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
    private accessTokenSecret: string;
    private refreshTokenSecret: string;

    constructor(accessTokenSecret: string, refreshTokenSecret: string) {
        this.accessTokenSecret = accessTokenSecret;
        this.refreshTokenSecret = refreshTokenSecret;
    }

    public async generateTokens(userId: string): Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign({ UserInfo: { id: userId } }, this.accessTokenSecret, {
            expiresIn: '1d'
        });

        const refreshToken = jwt.sign({ UserInfo: { id: userId } }, this.refreshTokenSecret, {
            expiresIn: '3d'
        });

        return { accessToken, refreshToken };
    }

    public async verifyToken(token: string, secret: string): Promise<number | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.error('JWT verification failed:', err);
                    resolve(null);
                } else {
                    console.log('JWT verified successfully:', (decoded as any).UserInfo.id);
                    resolve((decoded as any).UserInfo.id);
                }
            });
        });
    }

    public async findUserById(userId: string) {
        return await prismaClient.user.findUnique({
            where: { id: userId }
        });
    }
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

const authServiceInstance = new AuthService(accessTokenSecret, refreshTokenSecret);
export const authService = authServiceInstance;