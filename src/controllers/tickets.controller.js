import{ticketService} from "../services/services.js";
import { logger } from "../utils/logger.js";

export default class TicketsController {
  getTickets = async (res, req) => {
    try {
      const tickets = await ticketService.getTickets();

      tickets ? res.send({ status: "success", payload: tickets }) : res.status(501).send({ status: "Error", message: "No users tickets found" });
    } catch (error) {
      logger.error(error);
    }
  };

  getTicketById = async (res, req) => {
    try {
      const { tid } = req.params;
      const ticket = await ticketService.getTicket(tid);

      ticket ? res.status(200).send({ status: "success", toTicketIs: ticket }) : res.status(404).send({ status: "Error", message: "Your ticket does not exist" });
    } catch (error) {
      logger.error(error);
    }
  };
}
