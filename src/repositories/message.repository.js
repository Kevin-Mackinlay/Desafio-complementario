export default class MessagesRepository {
  constructor(dao) {
    this.dao = dao
  }

  async createMessages(message) {
    try {
      const newMessage = await this.dao.create(message);
      return newMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages() {
    try {
      const result = await this.dao.getMessages();
      return result;
    } catch (error) {
     console.log(error);
    }
  }
}
