import express, { Request, Response } from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/User";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";


router.post("/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().notEmpty().withMessage("Password must be supplied"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        //compare stored password with provided password
        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError("Invalid credentials");
        };

        // Generate JWT

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY!
        );

        //Store on a session object
        req.session = {
            jwt: userJwt
        };

        res.status(200).send(existingUser)
    });

export { router as signinRouter };