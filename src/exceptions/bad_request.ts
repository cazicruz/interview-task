import { HttpException } from './root';

export class BAdRequestException extends HttpException {
constructor(message: string, errorCode: number) {
    super(400, message, errorCode, null);
}
}

