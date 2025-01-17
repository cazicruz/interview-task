import { Request, Response } from 'express';
import { prismaClient } from '..';
import { BAdRequestException } from '../exceptions/bad_request';
import { ErrorCodes } from '../exceptions/root';

export default class ItemsController {
    public static async updateUser(req: Request, res: Response): Promise<any> {
        const { id, name, email } = req.body;

        if (!id || !name || !email) {
            throw new BAdRequestException('Missing required fields', ErrorCodes.BAD_REQUEST);
        }
        let idParam = id.trim().escape();

        try {
            const user = await prismaClient.user.update({
                where: {
                    id: idParam
                },
                data: {
                    name,
                    email
                }
            });

            return res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}