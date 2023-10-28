import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/Request-validation-error";
import { DatabaseConnectionError } from "../errors/Database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof RequestValidationError) {

        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })

    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    });
}
