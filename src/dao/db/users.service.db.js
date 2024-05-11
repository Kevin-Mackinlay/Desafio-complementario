import userModel from "../../dao/models/user.model.js";
import { logger } from "../../utils/logger.js";


export default class UserService {
  async create({ firstName, lastName, email, birthDate, password }) {
    try {
      console.log(email);
      return await userModel.create({
        firstName,
        lastName,
        email,
        birthDate,
        password,
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }
  async getByUser(userData) {
    try {
      return await userModel.findOne(userData).lean();
    } catch (error) {
      logger.error(error);
    }
  }

  getUsers = async (filter) => {
    try {
      const users = await userModel.find(filter).lean();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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

  deleteUsers = async (filter) => {
    try {
      return await userModel.deleteMany(filter);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }
}
