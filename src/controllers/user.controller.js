import { logger } from "../utils/logger.js";
import ContactDto from "../DTO/contact.dto.js";
import config from "../config/objectConfig.js";
import { userService, cartService } from "../services/services.js";
import transport from "../utils/nodemailer.js";

const { nodeMailer } = transport;

export default class UsersController {
  getUsers = async (req, res) => {
    try {
      const users = await userService.getUsers();
      const userDtos = users.map((user) => new ContactDto(user));
      req.logger.info(`Usuarios obtenidos: ${users.length}`);
      res.status(200).send({ status: " success", users: userDtos });

      // res.render("usersPanel", {
      //   title: "UsersPanel",
      //   style: "usersPanel.css",
      //   users
      // });
    } catch (error) {
      console.log(error);
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
            status: `the user ${user.firstName} ${user.lastName} is updated correctly`,
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

  deleteByUser = async (req, res) => {
    try {
      let { uid } = req.params;

      const userToDelete = await userService.getUser(uid);

      //configuramos nodemailer
      const transport = nodeMailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: objectConfig.EMAIL_USER,
          pass: objectConfig.APP_PASSWORD,
        },
      });

      // enviamos el email
      if (userToDelete.email) {
        await transport.sendMail({
          from: `Coder App <${process.env.EMAIL_USER}>`,
          to: userToDelete.email,
          subject: "Account deletion",
          text: `Dear ${userToDelete.firstName}, your account has been deleted.`,
        });
        req.logger.info(`Email sent to ${userToDelete.email}`);
      } else {
        req.logger.warning(`could not send email because user ${userToDelete._id} does not have an email`);
      }

      await cartService.deleteCart(userToDelete.cart[0]._id);
      req.logger.info(`Cart deleted for user ${userToDelete._id}`);

      await userService.deleteUser(uid);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      req.logger.error(`Error deleting user: ${error}`);
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  // let user = await userService.getUser({ _id: uid });

  // if (user) {
  //   await userService.deleteUser({ _id: uid });
  //   // await cartService.deleteCart({ _id: user.cart._id });

  //   res.status(200).send({ status: "success", payload: user });
  // } else {
  //   res.status(400).send({ status: "error", message: "could not delete user" });
  // }
  //   } catch (error) {
  //     console.log(error);
  //     logger.error(error);
  //   }
  // };

  deleteUsers = async (req, res) => {
    try {
      const twoDaysAgo = moment().subtract(2, "days").toDate();
      req.logger.info(`Deleting users created before ${twoDaysAgo}`);
      const usersToDelete = await userService.getUsers({ last_connection: { $lt: twoDaysAgo } });
      req.logger.info(`Users to delete: ${usersToDelete.length}`);

      //configuramos nodemailer

      const transport = nodeMailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: objectConfig.EMAIL_USER,
          pass: objectConfig.APP_PASSWORD,
        },
      });
      for (const user of usersToDelete) {
        if (user.email) {
          await transport.sendMail({
            from: `Coder App <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Account deletion",
            text: `Dear ${user.firstName}, your account has been deleted due to inactivity.`,
          });
          req.logger.info(`Email sent to ${user.email}`);
        } else {
          req.logger.warning(`could not send email because user ${user._id} does not have an email`);
        }

        await cartService.deleteCart(user.cart[0]._id);
        req.logger.info(`Cart deleted for user ${user._id}`);
      }

      await userService.deleteUsers({ _id: { $in: usersToDelete.map((user) => user._id) } });
      req.logger.info(`Users deleted: ${usersToDelete.length}`);
      res.json({ message: "Users deleted successfully" });
    } catch (error) {
      req.logger.error(`Error deleting users: ${error}`);
      res.status(500).json({ message: "Error deleting users" });
    }
  };
}
