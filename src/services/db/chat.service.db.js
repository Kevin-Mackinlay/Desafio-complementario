import MessageModel from "../../dao/models/message.model.js";

export default class ChatService {
  constructor(service) {
    this.messageService = service;
  }

  async createMessage(message) {
    try {
      const newMessage = await this.service.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(message) {
    try {
      const newMessage = await this.service.get(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }
}
