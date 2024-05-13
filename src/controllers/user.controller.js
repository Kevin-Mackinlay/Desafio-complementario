import { logger } from "../utils/logger.js";
import ContactDto from "../DTO/contact.dto.js";
import config from "../config/objectConfig.js";
import { userService, cartService } from "../services/services.js";
import transport from "../utils/nodemailer.js";

// const { nodeMailer } = transport;

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
      //obtenemos al usuario por su id
      const user = await userService.getUser(req.params.uid);
      //si el usuario no existe, devolvemos un error
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (!req.files) {
        return res.status(400).send({ status: "error", error: "No files were uploaded" });
      }
      let documents = req.files;
      // añadimos los documentos al usuario
      documents.forEach(doc => {
        user.documents.push({
          name: doc.originalname,
          reference: doc.path,
        });
      });
      // guardamos el usuario actualizado en la base de datos
      await userService.updateUser(req.params.uid, user);
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

  deleteUser = async (req, res) => {
    try {
      let { uid } = req.params;

      const userToDelete = await userService.getUser(uid);

      // Send email if user has an email address
      if (userToDelete.email) {
        try {
          await transport.sendMail({
            from: `Coder App <${objectConfig.EMAIL_USER}>`, // Consistent use of objectConfig
            to: userToDelete.email,
            subject: "Account Deletion",
            text: `Dear ${userToDelete.firstName}, your account has been deleted.`,
          });
          req.logger.info(`Email sent to ${userToDelete.email}`);
        } catch (emailError) {
          req.logger.error(`Failed to send email: ${emailError}`);
        }
      }

      // Proceed to delete the user's cart and then the user
      await cartService.deleteCart(userToDelete.cart[0]._id);
      await userService.deleteUser(uid);
      req.logger.info(`User deleted: ${uid}`);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
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

      for (const user of usersToDelete) {
        if (user.email) {
          try {
            await transport.sendMail({
              from: `Coder App <${objectConfig.EMAIL_USER}>`, // Use consistent configuration source
              to: user.email,
              subject: "Account Deletion",
              text: `Dear ${user.firstName}, your account has been deleted due to inactivity.`,
            });
            req.logger.info(`Email sent to ${user.email}`);
          } catch (emailError) {
            req.logger.warning(`Could not send email to ${user.email}: ${emailError}`);
          }
        } else {
          req.logger.warning(`Could not send email because user ${user._id} does not have an email`);
        }

        await cartService.deleteCart(user.cart[0]._id); // Assume each user has a cart to delete
        req.logger.info(`Cart deleted for user ${user._id}`);
      }

      await userService.deleteUser({ _id: { $in: usersToDelete.map((user) => user._id) } });
      req.logger.info(`Users deleted: ${usersToDelete.length}`);
      res.json({ message: "Users deleted successfully" });
    } catch (error) {
      req.logger.error(`Error deleting users: ${error}`);
      res.status(500).json({ message: "Error deleting users" });
    }
  };

  premiumUser = async (req, res) => {
    // Extraemos el uid del usuario desde los parámetros de la petición
    const { uid } = req.params;
    req.logger.info(`User ${uid} is now a premium user`);

    //obtenemos el usuario por su id
    const user = await userService.getUser(uid);

    if (req.user.role === "admin") {
      switch (user.role) {
        case "user":
          user.role = "premium";
          break;
        case "premium":
          user.role = "user";
          break;
      }
      //actualizamos el usuario en la base de datos
      const updatedUser = await userService.updateUser(uid, user);
      req.logger.info(`User new rol: ${user.role}`);
      // enviamos respuesta con estado 200 y el usuario actualizado
      res.status(200).send({ status: "success", user: user });
      return;
    }

    // Definimos los documentos requeridos para ser usuario premium
    const REQUIRED_DOCUMENTS = ["identification", "address_proof", "account_statement"];

    // Verificamos si el usuario tiene todos los documentos requeridos
    if (REQUIRED_DOCUMENTS.every((doc) => user.documents.map((document) => document.name.split(".")[0]).includes(doc))) {
      // Si el usuario tiene todos los documentos, cambiamos su rol
      switch (user.role) {
        case "user":
          user.role = "premium";
          break;
        case "premium":
          user.role = "user";
          break;
      }
      // Actualizamos el usuario en la base de datos
      const updateUser = await userService.updateUserById(uid, user);
      req.logger.info(`Usuario actualizado a rol: ${user.role}`);
      // Enviamos una respuesta con estado 200 y el usuario actualizado
      res.status(200).send({ status: "success", user: user });
    } else {
      // Si el usuario no tiene todos los documentos, enviamos un error
      req.logger.error("Faltan documentos requeridos");
      res.status(400).send("Faltan documentos requeridos");
    }
  };
}
