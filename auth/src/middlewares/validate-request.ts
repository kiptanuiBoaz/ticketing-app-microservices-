import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/Request-validation-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    //getting access to the validation errors
    const errors = validationResult(req);

    //throw errors
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    };

    next();
}