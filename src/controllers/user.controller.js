import services from "../services/services.js";
import { logger } from "../utils/logger.js";
import transport from "../utils/nodeMailer.js";
import contactDTO  from "../DTOs/contact.dto.js";
import config from "../config/objectConfig.js";
const { userService, cartService } = services;

export default class UsersController {
  getAllUsers = async (req, res) => {
    try {
      const usersDb = await userService.getUsers();
      const users = usersDb.map((user) => new contactDTO(user));

      res.render("usersPanel", {
        title: "Users Panel",
        style: "usersPanel.css",
        users,
      });
      // users
      // ? res.status(200).send({ status:"information was successfully extracted from the database", payload: users })
      // : res.status(500).send({ status:"Error", message: "No user data found" })
    } catch (error) {
      logger.error(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await userService.getUser({ _id: uid });

      !user ? res.send({ status: "error", message: "User not available" }) : res.send({ status: "the user was found", payload: user });
    } catch (error) {
      logger.error(error);
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


  updateOldUser = async (req, res) => {
    try {
      const { uid } = req.params;
      const userToReplace = req.body;
      const user = await userService.getUser({ _id: uid });
      let result = await userService.updateUser({ _id: uid }, userToReplace);

      if (!user) return res.status(404).send({ status: "Error", message: "User not found" });

      result
        ? res.status(200).send({
            status: `the user ${user.firtsName} ${user.lastName} is updated correctly`,
            payload: result,
          })
        : res.status(410).send({
            status: "Error",
            message: "Could not update user data",
          });
    } catch (error) {
      logger.error(error);
    }
  };

  deleteByUser = async (id) => {
    try {
      let { uid } = req.params;
      let user = await userService.getUser({ _id: uid });

      if (user) {
        await userService.deleteUser({ _id: uid });
        await cartService.deleteCart({ _id: user.cart._id });

        res.status(200).send({ status: "success", payload: user });
      } else {
        res.status(400).send({ status: "error", message: "could not delete user" });
      }
    } catch (error) {
      logger.error(error);
    }
  };
}
