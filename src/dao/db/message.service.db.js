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


