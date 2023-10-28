import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/Request-validation-error";
import { DatabaseConnectionError } from "../errors/Database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof RequestValidationError) {
        const formattedErrors = err.errors.map(error => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
        });

        return res.status(400).send({ errors: formattedErrors });
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({
            errors: [{ message: err.reason }]
        })

    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    });
}
