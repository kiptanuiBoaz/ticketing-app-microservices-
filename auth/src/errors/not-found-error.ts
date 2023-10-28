import { CustomError } from "./Custom-error";

export class NotFoundedError extends CustomError {
    statusCode = 404;

    constructor() {
        super("Route not found");

        Object.setPrototypeOf(this, NotFoundedError.prototype);
    }

    serializeErrors() {
        return [{ message: "Not Found" }]
    }
}