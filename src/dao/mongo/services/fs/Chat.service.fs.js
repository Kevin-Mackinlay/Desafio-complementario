import crypto from "crypto";
import fs from "fs";
import ChatManager from "./Chat.service.fs.js";

const chatManager = new ChatManager();

export default class ChatsManager {
  #chatsFilePath;

  constructor(filePath = "./src/chats.json") {
    this.#chatsFilePath = filePath;
  }

  async createChat() {
    try {
      const newChat = {
        id: crypto.randomUUID(),
        messages: [],
      };

      const chats = await this.getChats();

      chats.push(newChat);

      this.#saveChats(chats);
    } catch (error) {
      throw error;
    }
  }

  async getChats() {
    try {
      if (fs.existsSync(this.#chatsFilePath)) {
        const chats = JSON.parse(await fs.promises.readFile(this.#chatsFilePath, "utf-8")); // read the file
        return chats;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  async getChatById(id) {
    try {
      const chats = await this.getChats();
      const chat = chats.find((chat) => chat.id == id);

      if (!chat) {
        throw new Error(`Chat with id ${id} was not found.`);
      }

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async addMessageToChat(id, message) {
    try {
      const chats = await this.getChats();
      const chat = chats.find((chat) => chat.id == id);

      if (!chat) {
        throw new Error(`Chat with id ${id} was not found.`);
      }

      chat.messages.push(message);

      this.#saveChats(chats);
    } catch (error) {
      throw error;
    }
  }

  #saveChats = async (chats) => {
    try {
      await fs.promises.writeFile(this.#chatsFilePath, JSON.stringify(chats, null, 2)); // write the file
    } catch (error) {
      throw error;
    }
  };
}
