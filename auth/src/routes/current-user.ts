import express from "express";
import jwt from "jsonwebtoken";



const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    if (!req.session?.jwt) return res.send({ currentUser: null });

    //decrypt the token
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({ currentUser: payload });
    } catch (error) {
        res.send({ currentUser: null })
    }

    res.send("Hi there")
});

export { router as currentUserRouter };