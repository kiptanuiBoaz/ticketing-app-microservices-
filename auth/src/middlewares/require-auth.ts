import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    //handle case where no user is signed in
    if (!req.currentUser) throw new NotAuthorizedError();

    next();
}