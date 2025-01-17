import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; username: string }; // Add relevant fields here
        }
    }

    interface UserObj {
        email?: string;
        name?: string;
        password?: string;
    }
}