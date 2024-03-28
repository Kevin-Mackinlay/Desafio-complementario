import CustomError from "../customErrors/customError.js";
import typeErrors from "../customErrors/enums.js";
import { generateUserErrorInfo } from "../customErrors/info.js";

export default class UsersController {
  constructor(UsersService) {
    this.usersService = UsersService;
  }
  getUsers = async (req, res) => {
    try {
      const usersDb = await this.usersService.get();
      const users = usersDb.map((user) => {
        return {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
      });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // createUser = async (newUser) => {
  //   try {
  //     const { first_name, last_name, email, password } = req.body;
  //     if (!first_name || !last_name || !email || !password) {
  //     CustomError.createError({
  //       name:"Error creando usuario",
  //     cause: generateUserErrorInfo(req.body),
  //     message: "Faltan datos obligatorios",
  //     code:typeErrors.INVALID_TYPES_ERROR,

  //     });
  //     const userDb = await this.usersService.create(newUser);
  //     return userDb;
  //   }
  //   }
  //   catch (error) {
  //     throw error;
  //   }

  // modifyUser = async (id, user) => {
  //   try {
  //     const userDb = await this.usersService.modify(id, user);
  //     return userDb;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  modifyUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
