import express from "express";
import services from "../dao/factory.js";
import TicketsController from "../controllers/tickets.controller.js";
import authorization from "../config/authorization.js";
import passportCall from "../config/passport.config.js";

const ticketRouter = express.Router();
const ticketsController = new TicketsController(services.ticketService);

ticketRouter.get("/", passportCall("jwt"), authorization("admin", ticketsController.getTickets));
ticketRouter.get("/:cid", passportCall("jwt"), authorization("user", ticketsController.getTickets));

export default ticketRouter;
