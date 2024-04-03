
import { ticketModel } from './models/ticket.model.js';
import { logger } from '../../utils/logger.js';



export default class TicketService {

  async create(ticket) {
    try {
      return await ticketModel.create(ticket);
    } catch (error) {
      logger.error(error);
    }
  }

  async get() {
    try {
      return await ticketModel.find();
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      return await ticketModel.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }
}

