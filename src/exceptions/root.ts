export class HttpException extends Error {
  statusCode: number;
  message: string;
  errorCode:ErrorCodes;
  errors:any;
    constructor(statusCode: number, message: string,errorCode:ErrorCodes,errors:any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_PASSWORD = 2003,
    INVALID_TOKEN=2004,
    INVALID_REQUEST=2005,
    BAD_REQUEST=4001,
}