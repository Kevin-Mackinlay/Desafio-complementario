import express from "express";
import services from "../services/factory.js";
import TicketsController from "../controllers/tickets.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorization from "../config/authorization.js";

const ticketRouter = express.Router();
const ticketsController = new TicketsController(services.ticketService);


ticketRouter.get("/", authorization(("admin"), ticketsController.createTicket));
ticketRouter.get("/:cid", authorization(("user"), ticketsController.getTickets));


export default ticketRouter;
