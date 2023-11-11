import express, { Request, Response } from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/Request-validation-error";


router.post("/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().notEmpty().withMessage("Password must be supplied"),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        //check presence of errors
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        res.send("Hi there")
    });

export { router as signinRouter };