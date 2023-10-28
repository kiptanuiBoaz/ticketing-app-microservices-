import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/Request-validation-error";
import { DatabaseConnectionError } from "../errors/Database-connection-error";

const router = express.Router();

router.post("/api/users/signup", [

    //validation withlibrary
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")

], (req: Request, res: Response) => {
    //getting access to the validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    console.log("Creating a user...");
    throw new DatabaseConnectionError();

    res.send({})

});

export { router as signupRouter };