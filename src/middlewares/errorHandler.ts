import { Request, Response, NextFunction } from 'express';
import { logEvents } from './logEvents';

class ErrorHandler {
    public handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
        logEvents(`${err.name}: ${err.message}`, 'errLog.txt');

        if (err.message) {
            res.status((err as any).statusCode || 500).json({
                statusCode: (err as any).statusCode || 500,
                message: err.message,
            });
        } else {
            res.status(500).json('Internal Server Error');
        }
    }
}

const errorHandlerInstance = new ErrorHandler();
export const errorHandler = errorHandlerInstance.handleError.bind(errorHandlerInstance);