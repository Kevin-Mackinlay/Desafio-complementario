

import CustomError from "../customErrors/customError.js";
// import generateUserErrorInfo from "../customErrors/info.js";


export default class UsersController {
  constructor(UsersService) {
    this.usersService = UsersService;
  }
  getUsers = async () => {
    try {
     
      const userDb = await this.usersService.get();
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  createUser = async (newUser) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        throw new CustomError(generateUserErrorInfo(newUser));
      }
      const userDb = await this.usersService.create(newUser);
      return userDb;
    }
    catch (error) {
      throw error;
    }

   
   
  };

  modifyUser = async (id, user) => {
    try {
      const userDb = await this.usersService.modify(id, user);
      return userDb;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const userDb = await this.usersService.getUserById(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  deleteUser = async (id) => {
    try {
      const userDb = await this.usersService.delete(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
}
