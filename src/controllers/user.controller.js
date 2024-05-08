import services from "../services/services.js";
import { logger } from "../utils/logger.js";
import transport from "../utils/nodeMailer.js";
import contactDTO from "../DTOs/contact.dto.js";
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

  uploadDocuments = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await userService.getUser({ _id: uid });
      const files = req.files;

      if (files) {
        files.forEach(async (file) => {
          await userService.updateUser(
            { _id: uid },
            {
              $addToSet: {
                documents: {
                  name: file.filename,
                  reference: file.destination,
                  docType: file.fieldname,
                },
              },
            }
          );
        });
        return res.status(201).send({ status: "success", message: `${user.firstName} the ${files.map((file) => file.fieldname)} files were uploaded correctly` });
      } else {
        return res.status(400).send({ status: "error", message: "error trying to upload files" });
      }
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

  changeOfRole = async (req, res) => {
    try {
      let { uid } = req.params;
      let user = await userService.getUser({ _id: uid });
      const requiredDocs = user.documents.some((doc) => doc.docType.includes("identity" && "myAddress" && "myAccount"));

      if (!user) return logger.error("User not found");

      if (requiredDocs) {
        user.role == "user" ? (await userService.updateUser({ _id: uid }, { role: "premium" })) && res.send({ status: "success", message: "User is now a premium user" }) : (await userService.updateUser({ _id: uid }, { role: "user" })) && res.send({ status: "success", message: "User is now a regular user" });
      } else {
        return res.status(403).send({ status: "error", message: "User must upload the required documents" });
      }
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
