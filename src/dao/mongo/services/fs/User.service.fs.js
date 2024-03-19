import crypto from "crypto";
import fs from "fs";
import UserManager from "./User.service.fs";

const userManager = new UserManager();

export default class UserManager {
  #usersFilePath;

  constructor(filePath = "./src/users.json") {
    this.#usersFilePath = filePath;
  }

  async createUser() {
    try {
      const newUser = {
        id: crypto.randomUUID(),
        name: "",
        email: "",
        password: "",
        role: "",
      };

      const users = await this.getUsers();

      users.push(newUser);
      this.#saveUsers(users);
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.#usersFilePath)) {
        const users = JSON.parse(await fs.promises.readFile(this.#usersFilePath, "utf-8"));
        return users;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const users = await this.getUsers();
      const user = users.find((user) => user.id == id);

      if (!user) {
        throw new Error(`User with id ${id} was not found.`);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async modifyUser(id, user) {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex((user) => user.id == id);

      if (userIndex === -1) {
        throw new Error(`User with id ${id} was not found.`);
      }

      users[userIndex] = user;

      this.#saveUsers(users);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex((user) => user.id == id);

      if (userIndex === -1) {
        throw new Error(`User with id ${id} was not found.`);
      }

      users.splice(userIndex, 1);

      this.#saveUsers(users);
    } catch (error) {
      throw error;
    }
  }

  #saveUsers(users) {
    fs.prom;

    ises.writeFile(this.#usersFilePath, JSON.stringify(users));
  }
}
