import { Request, Response } from 'express';
import { prismaClient } from '..'; 
import { accountService } from "../services/accountService";
import {BAdRequestException} from '../exceptions/bad_request';
import { ErrorCodes, HttpException } from '../exceptions/root';
import redisClient from '../redisClient';



export default class AccountController {
    static async transfer(req:Request, res:Response): Promise<any> {
        const userId: string = req.userId as unknown as string;
        const { receiversId, amount } = req.body;

        const result = await accountService.transfer(userId, receiversId, amount);
        if (!result) {
            throw new BAdRequestException("Invalid request",ErrorCodes.INVALID_REQUEST );
        }
        return res.status(200).json({success: true, data:result});        
    }

    static async balance(req:Request, res:Response): Promise<any> {
        const userId = req.userId as unknown as string;

        // Check if the balance is cached in Redis
        const cachedBalance = await redisClient.get(`balance:${userId}`);
        if (cachedBalance) {
            return res.status(200).json({ success: true, data: { balance: parseFloat(cachedBalance) } });
        }
        const balance = await accountService.getBalance(userId);
        if(!balance){
            throw new HttpException(400, "Error retrieving balance", ErrorCodes.USER_NOT_FOUND, []);
        }
        // Cache the balance in Redis for 60 seconds
        await redisClient.set(`balance:${userId}`, balance.balance.toString(), { EX: 60 });
        return res.status(200).json({success: true, data:balance});
    }

    static async fetchTransactions(req:Request, res:Response): Promise<any> {
        const userId = req.userId as unknown as string;
        const transactions = await accountService.fetchTransactions(userId);
        if(!transactions){
            throw new HttpException(400, "Error retrieving transactions", ErrorCodes.USER_NOT_FOUND, []);
        }
        return res.status(200).json({success: true, data:transactions});
    }
}