import express from "express";
import services from "../dao/factory.js";
import TicketsController from "../controllers/tickets.controller.js";
import authorization from "../passportJwt/authorization.js";
import passportCall from "../passportJwt/passportCall.js";

const ticketRouter = express.Router();
const ticketsController = new TicketsController(services.ticketService);

ticketRouter.get("/", passportCall("jwt"), authorization("admin", ticketsController.getTickets));
ticketRouter.get("/:cid", passportCall("jwt"), authorization("user", ticketsController.getTickets));

export default ticketRouter;
