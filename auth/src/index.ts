import mongoose from "mongoose";

import { app } from "./app";


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


