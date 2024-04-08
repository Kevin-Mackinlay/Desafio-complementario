import { logger } from "../utils/logger.js";
import  userService  from "../services/services.js";
import { generateToken, generateTokenUrl } from "../utils/jsonWebToken.js";
import { validPassword, creaHash } from "../utils/bcryptHash.js";
import transport from "../utils/nodeMailer.js";

export default class SessionsController {
  signup = async (req, res) => {
    try {
      const { first_name, last_name, email, password, age } = req.body;

      //validacion si vienen los campos vacios
      if (first_name === "" || last_name === "" || email === "" || password === "" || age === "") {
        res.status(400).send({ status: "Error", message: "Fill in the missing fields" });
      }
      //validacion si el email ya esta registrado
      if (await this.userService.getUser({ email })) {
        res.status(400).send({ status: "Error", message: "This email is registered" });
      }
      //validacion si el username ya esta registrado
      if (await userService.getUser({ userName })) {
        return res.status(400).send({ status: "Error", message: "Username is not available" });
      }
      let Accesstoken = generateToken({ first_name, last_name, email});
      const user = await userService.createUser({ first_name, last_name, email, age, password: creaHash(password) });

      user
        ? res.status(201).send({
            status: "success",
            message: `The user ${user.first_name} ${user.last_name} registered successfully`,
            Accesstoken,
          })
        : res.status(500).send({
            status: "error",
            message: "A problem occurred and the request could not be completed",
          });
    } catch (error) {
      logger.error(error);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getUser({ email });

      //validacion de campos vacios
      if (email === "" || password === "") {
        res.status(400).send({ status: "error", message: "Fill in the missing fields" });
      }

      //validacion si el email no esta registrado
      if (!user) {
        res.status(400).send({ status: "error", message: "This email is not registered" });
      }

      //validacion de contraseña
      if (!validPassword(password, user)) {
        res.status(400).send({ status: "error", message: "Incorrect password" });
      }

      //validacion de usuario ADMIN
      if (email === procces.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        await userService.updateUser({ _id: user._id }, { role: "admin" });
      }
      let Accesstoken = generateToken(user);
      req.user = user;

      req.user.role
        ? (await userService.updateUser({ _id: user._id }, { lastConnection: Date() })) &&
          res
            .status(200)
            .cookie("CoderCookieToken", Accesstoken, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true,
            })
            .send({ status: "success", message: `${user.firtsName} you have logged in successfully` })
        : res.status(404).send({ status: "Error", message: "There was an error when logging in" });
    } catch (error) {
      logger.error(error);
    }
  };

  logout = async (req, res) => {
    try {
      await userService.updateUser({ _id: req.user._id }, { lastConnection: Date() });
      res.clearCookie("CoderCookieToken").redirect("/login");
    } catch (error) {
      logger.error(error);
    }
  };

  infoCurrent = async (req, res) => {
    try {
      const { email } = req.user;
      const contact = await contactService.getContact({ email });

      contact ? res.status(200).send({ status: "success", toInfo: contact }) : res.status(404).send({ status: "Error", message: "Your information does not exist" });
    } catch (error) {
      logger.error(error);
    }
  };

  private = async (req, res) => {
    try {
      res.status(200).json({ message: "Ruta privada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
