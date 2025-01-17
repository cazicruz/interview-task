import { prismaClient } from '..';
import * as jwt from 'jsonwebtoken';

class AccountService {
    

    public async transfer(userId: string, receiversId:string, amount:number){
        const result = await prismaClient.$transaction(async (prisma) => {
            const sender = await prisma.user.findUnique({
                where: { id: userId },
                select: { balance: true,
                    email:true,
                 }
            });

            const receiver = await prisma.user.findUnique({
                where: { id: receiversId },
                select: { balance: true ,
                email:true,
                }
            });

            if (!sender || !receiver) {
                throw new Error("User not found");
            }

            if (sender.balance < amount) {
                throw new Error("Insufficient balance");
            }

            const updatedSender = await prisma.user.update({
                where: { id: userId },
                data: { balance: sender.balance - amount }
            });

            const updatedReceiver = await prisma.user.update({
                where: { id: receiversId },
                data: { balance: receiver.balance + amount }
            });

            const transaction = await prisma.transaction.create({
                data: {
                    senderId: userId,
                    receiverId: receiversId,
                    amount: amount
                }
            });

            return { updatedSender, updatedReceiver, transaction };
        });

        return result;
    }



    public async getBalance(user_id: string){
        const balance = await prismaClient.user.findUnique({     
            where: {id: user_id},
            select: {balance: true}
        });
        return balance
    }

    public async fetchTransactions(userId: string) {
        const transactions = await prismaClient.transaction.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            include: {
                sender: {
                    select: {
                        email: true,
                        name: true
                    }
                },
                receiver: {
                    select: {
                        email: true,
                        name: true
                    }
                }
            }
        });
        return transactions;
    }
}

const AccountServiceInstance = new AccountService();
export const accountService = AccountServiceInstance;