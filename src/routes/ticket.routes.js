import express from "express";
import services from "../services/factory.js";
import TicketsController from "../controllers/tickets.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const ticketRouter = express.Router();
const ticketsController = new TicketsController(services.ticketService);


ticketRouter.get("/", isAuthenticated(["admin"]), ticketsController.createTicket);
ticketRouter.get("/:cid", isAuthenticated(["admin"]), ticketsController.getTickets);
ticketRouter.delete("/:cid", isAuthenticated(["admin"]), ticketsController.deleteTicket);

export default ticketRouter;
