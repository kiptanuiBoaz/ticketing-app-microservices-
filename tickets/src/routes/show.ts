import express, { Request, Response } from "express";
import { NotFoundError } from "@gittixteam/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket); //returns a default status of 200
});

export { router as showTicketsRouter };