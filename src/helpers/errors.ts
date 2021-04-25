import { SchemaValidatorError } from '@types';
type ErrorReason = SchemaValidatorError[] | string;

/**
 * ApiError Error class
 */
export class ApiError extends Error {
    name: string;
    message: string;
    httpStatusCode: number;
    errorCode: number;
    reason: ErrorReason

    constructor(message: string, errorCode = 1000, httpStatusCode = 400, reason: ErrorReason = '') {
        super();
        this.name = 'ApiError';
        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.errorCode = errorCode;
        this.reason = reason;
    }

    getMessage(): { 'Error': string } {
        return { 'Error': this.message };
    }
}
