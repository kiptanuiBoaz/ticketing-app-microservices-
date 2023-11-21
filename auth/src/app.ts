import express from "express";
import "express-async-errors";// dealing with async and error throwing issues
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundedError } from "./errors/not-found-error";


const app = express();
//traffic is being proxied through ingress and nginx
app.set("trust proxy", true);
app.use(json());
//cookie management middleware
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",//musbe be http
}))

//auth routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

//catch all  lost directories
app.all("*", async () => {
    throw new NotFoundedError();
})

//error hanling middleware
app.use(errorHandler);

export { app };