import express from "express";
import {TicketServiceDb} from "../dao/factory.js";
import TicketsController from "../controllers/tickets.controller.js";



const ticketRouter = express.Router();
const ticketsController = new TicketsController();

ticketRouter.get("/",  ticketsController.getTickets);
ticketRouter.get("/:cid", ticketsController.getTickets);

export default ticketRouter;
