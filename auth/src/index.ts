import express from "express";
import "express-async-errors";// dealing with async and error throwing issues
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundedError } from "./errors/not-found-error";

const app = express();
app.use(json());

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


