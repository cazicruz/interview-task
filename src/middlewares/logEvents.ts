import { Request, Response, NextFunction } from 'express';
import { promises as fsPromises, existsSync } from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

class Logger {
    private logDirectory: string;

    constructor() {
        this.logDirectory = join(__dirname, '..', 'logs');
    }

    public async logEvents(message: string, logName: string): Promise<void> {
        const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
        const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

        try {
            if (!existsSync(this.logDirectory)) {
                await fsPromises.mkdir(this.logDirectory);
            }

            await fsPromises.appendFile(join(this.logDirectory, logName), logItem);
        } catch (err) {
            console.error(err);
        }
    }

    public loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
        this.logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
        console.log(`${req.method} ${req.path}`);
        next();
    }
}

const loggerInstance = new Logger();
export const logger = loggerInstance.loggerMiddleware.bind(loggerInstance);
export const logEvents = loggerInstance.logEvents.bind(loggerInstance);