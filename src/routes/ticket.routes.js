import express from 'express';
import TicketController from '../controllers/ticket.controller.js';
import services from '../services/factory.js';

const ticketController = new TicketController(services.ticketService);
const ticketRouter = express.Router();

ticketRouter.get('/', ticketController.createTicket);
ticketRouter.get('/:cid', ticketController.getTicket);
ticketRouter.put('/:cid', ticketController.updateTicket);
ticketRouter.delete('/:cid', ticketController.deleteTicket);

export default ticketRouter;
