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
      return await userModel.findOne(userData);
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

  async deleteUser(id) {
    try {
      return await userModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
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
  };

  getUserByResetToken = async (email, Token) => {
    try {
      return await userModel.findOne({
        email: email,
        resetPasswordToken: Token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
      });
    } catch (error) {
      console.log("Error getting user by reset token", error.message);
      logger.error(error);
    }
  };

  updateUserPassword = async (id, password) => {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

      return await userModel.updateOne(
        { _id: id },
        {
          $set: {
            password: hashedPassword,
            resetPasswordToken: undefined, //clears the reset token
            resetPasswordExpires: undefined, // clears the expiration time
          },
        }
      );
    } catch (error) {
      console.log("Error updating user password", error.message);
      logger.error(error);
    }
  };
}
