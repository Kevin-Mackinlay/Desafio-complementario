import userModel from "../../dao/models/user.model.js";
import { logger } from "../../utils/logger.js";
import bcrypt from "bcrypt";

class UserServiceDb {
  async create(data) {
    try {
      console.log(data.email);
      return await userModel.create(data);
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

  async getUsers(filter) {
    try {
      const users = await userModel.find(filter).lean();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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

  async deleteUsers(filter) {
    try {
      return await userModel.deleteMany(filter);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }
  async findOne(query) {
    try {
      console.log("Query in findOne:", query);
      const user = await userModel.findOne(query);
      console.log("Result in findOne:", user);
      return user;
    } catch (error) {
      console.log("Error getting user by reset token", error.message);
      logger.error(error);
      throw error;
    }
  }

  async updateUserPassword(id, password) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

      return await userModel.updateOne(
        { _id: id },
        {
          $set: {
            password: hashedPassword,
            resetPasswordToken: undefined, // clears the reset token
            resetPasswordExpires: undefined, // clears the expiration time
          },
        }
      );
    } catch (error) {
      console.log("Error updating user password", error.message);
      logger.error(error);
      throw error;
    }
  }

  setPasswordResetToken = async (email) => {
    try {
      const token = crypto.randomBytes(20).toString("hex");
      const expires = Date.now() + 86400000; // 24 hours

      // Log the date and time when the token will expire
      const expirationDate = new Date(expires);
      console.log("Token expires at (UTC):", expirationDate.toUTCString());
      console.log("Token expires at (Local):", expirationDate.toString());

      await userModel.updateOne(
        { email: email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: new Date(expires),
          },
        }
      );

      return token;
    } catch (error) {
      console.log("Error setting reset token", error.message);
      throw error;
    }
  };
}

export default UserServiceDb;


