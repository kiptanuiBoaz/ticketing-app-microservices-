import express from "express";
import "express-async-errors";// dealing with async and error throwing issues
import { json } from "body-parser";
import mongoose from "mongoose";
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
    secure: true,//musbe be http
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


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is must be defined");
    };

    try {
        //db connection   
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDB")
    } catch (error: any) {
        console.error(error.message);
    }

    //listent for traffic
    app.listen(3000, () => {
        console.log("Auth server listening on port 3000!!");
    })

}

start();


