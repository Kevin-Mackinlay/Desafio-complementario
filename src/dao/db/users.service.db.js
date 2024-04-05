import userModel from "../../dao/models/user.model.js";
import { logger } from "../../utils/logger.js";
import CartService from "./carts.service.db.js";

const cart = new CartService();

export default class UserService {
  async create({ firtsName, lastName, userName, email, birthDate, password }) {
    try {
      return await userModel.create({
        firtsName,
        lastName,
        userName,
        email,
        birthDate,
        password,
        cart: await cart.create(),
      });
    } catch (error) {
      logger.error(error);
    }
  }
  async getByUser(userData) {
    try {
      return await userModel.findOne({ ...userData });
    } catch (error) {
      logger.error(error);
    }
  }

  async get() {
    try {
      return await userModel.find();
    } catch (error) {
      logger.error(error);
    }
  }

  async update(id, updateBody) {
    try {
      return await userModel.updateOne({ _id: id }, updateBody);
    } catch (error) {
      logger.error(error);
    }
  }

  async delete(id) {
    try {
      return await userModel.deleteOne({ _id: id });
    } catch (error) {
      logger.error(error);
    }
  }
}
