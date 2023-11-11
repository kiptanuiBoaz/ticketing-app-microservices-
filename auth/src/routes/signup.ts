import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/Request-validation-error";
import { DatabaseConnectionError } from "../errors/Database-connection-error";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken"

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

], async (req: Request, res: Response) => {
    //getting access to the validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //email duplication error
    if (existingUser) {
        console.log(`User ${existingUser.email} is already in use`);
        throw new BadRequestError("Email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT

    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_KEY!
    );

    //Store on a session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };