import { logger } from "../utils/logger.js";

export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser = async (newUser) => {
    try {
      return await this.dao.create(newUser);
    } catch (error) {
      logger.error(error);
    }
  };

  getUser = async (uid) => {
    try {
      return await this.dao.getByUser(uid);
    } catch (error) {
      logger.error(error);
    }
  };

  getUsers = async (filter) => {
    const users = await this.dao.getUsers(filter);
    return users;
  };

  updateUser = async (uid, updateData) => {
    try {
      console.log(1);
      const res = await this.dao.update(uid, updateData);

      return res;
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  deleteUser = async (uid) => {
    try {
      return await this.dao.delete(uid);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };
  deleteUsers = async (filter) => {
    try {
      return await this.dao.deleteUsers(filter);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  getUserByResetToken = async (email, token) => {
    try {
      const query = {
        email: email,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
      };
      console.log("Query for getUserByResetToken:", query);
       const user = await this.dao.findOne(query);
       console.log("User document found:", user);
       return user;
    } catch (error) {
      logger.error("Error getting user by reset token:", error);
      throw error;
    }
  }

    updateUserPassword = async (id, password) => {
      try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
         
        return await this.dao.update(id, {
            $set: {
              password: hashedPassword,
              resetPasswordToken: undefined, // clears the reset token
              resetPasswordExpires: undefined, // clears the expiration time
            },
          });
      } catch (error) {
        logger.error("Error updating password:", error);
      }
    };
}
