import MessageModel from "../../dao/models/message.model.js";

export default class MessagesService {
  async createMessage(message) {
    try {
      const newMessage = await MessageModel.create(message);

      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async findMessages() {
    try {
      const messages = await MessageModel.find().lean();

      return messages;
    } catch (error) {
      throw error;
    }
  }
}
