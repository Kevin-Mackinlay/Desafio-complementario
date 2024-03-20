import MessageModel from "../../dao/models/message.schema.js";

export default class ChatService {
  constructor(serv) {
    this.serv = serv;
  }

  async createMessage(message) {
    try {
      const newMessage = await this.serv.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(message) {
    try {
      const newMessage = await this.serv.get(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }
}
