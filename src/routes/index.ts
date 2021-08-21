import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@devneering/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", requireAuth, async (req: Request, res: Response) => {
  const ticket = await Ticket.find({});
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).send(ticket);
});

export { router as indexTicketRouter };
