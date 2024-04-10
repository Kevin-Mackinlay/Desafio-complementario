import { logger } from "../utils/logger.js";
import  userService  from "../services/services.js";
import { generateToken, generateTokenUrl } from "../utils/jsonWebToken.js";
import { validPassword, creaHash } from "../utils/bcryptHash.js";
import transport from "../utils/nodeMailer.js";

export default class SessionsController {


  signup = async (req, res) => {
    try {
   
    if (!req.signupSuccess) {
			return res.status(400).json({ success: false, text: "User already exists" });
		}

		res.status(201).json({ success: true, message: "User created", redirectUrl: "/login" });
	} catch (error) {
    console.log(error);
  };
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
            .send({ status: "success", message: `${user.firstName} you have logged in successfully` })
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