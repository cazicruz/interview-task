import { Request, Response } from 'express';
import { prismaClient } from '..'; 
import { hashSync,compareSync, compare } from 'bcryptjs';
import {authService} from '../services/authService';
import {BAdRequestException} from '../exceptions/bad_request';
import { ErrorCodes } from '../exceptions/root';


//Note here dependency injections are avoided due to the small scope of the project

export default class AuthController {
    static async login(req: Request, res: Response): Promise<any> {
        const {email, password} = req.body;
        
        try{
            const user = await prismaClient.user.findFirst({where: {email}});
            if(!user){
                return res.status(404).json({success: false, msg: 'User not found'});
            }
            if(!compareSync(password, user.password)){
                return res.status(401).json({success: false, msg: 'Invalid password'});
            }
            const {accessToken} = await authService.generateTokens(user.id);
            const { password: _, ...userWithoutPassword } = user;

            return res.status(200).json({success: true, data: {userWithoutPassword,accessToken}});
        }catch(err){
            console.error(err);
            return res.status(500).json({success: false, error: 'Internal server error'});
        }
    }

    static async register(req: Request, res: Response): Promise<any> {
        const { email, password, name } = req.body;
        
        const existingUser = await prismaClient.user.findFirst({ where: { email } });
        if (existingUser) {
            throw new BAdRequestException('User already exists',ErrorCodes.USER_ALREADY_EXISTS);
        }

        const hashedPassword = hashSync(password, 10);
        const result = await prismaClient.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: { email, password: hashedPassword, name },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    balance: true,
                },
            });

            const { accessToken, refreshToken } = await authService.generateTokens(user.id);
            //remember to update the user model definition to contain refereshtoken so it can be saved there and stop passing it in response

            return { user, accessToken, refreshToken };
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        });
    }


    static async logout(req: Request, res: Response): Promise<void> {
        res.send('Logout');
    }

    // more related methods should go here but as directed he adhear to the scope of the task.
}
