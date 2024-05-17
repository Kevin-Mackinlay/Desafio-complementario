import messageModel from "../models/message.model.js";


export default class messageManager {
  constructor() {
 
  }

  async createMessage(message) {
    try {
      return await messageModel.create(message);
    
    } catch (error) {
     console.error('Message not created', error.message);
     return error;
    }
  }

  async getMessages(message) {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
     
      console.error('Messages not found', error.message);
      return error;
    }
  }
}


export default class ChatService {
  constructor(repo) {
    this.repo= repo;
  }

  async createMessage(message) {
    try {
      const newMessage = await this.repo.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(message) {
    try {
      const newMessage = await this.repo.get(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }
}
