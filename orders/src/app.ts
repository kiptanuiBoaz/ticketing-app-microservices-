import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@gittixteam/common";
import { json } from "body-parser";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true); // make express aware that it is behind ingress nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, //disable encryption
    //set secure to false when in a test env, otherwise set it to true.
    secure: process.env.NODE_ENV !== "test", //ensure traffic comes from a https
  })
);
//expose the authenticated user to the routes
app.use(currentUser);

app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };