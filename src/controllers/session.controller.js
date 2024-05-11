import { logger } from "../utils/logger.js";
import { userService } from "../services/services.js";
import { generateToken, generateTokenUrl } from "../utils/jsonWebToken.js";
import { validPassword, creaHash } from "../utils/bcryptHash.js";
import transport from "../utils/nodeMailer.js";

export default class SessionsController {
  signup = async (req, res) => {
    try {
      if (!req.signupSuccess) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      res.status(201).json({ success: true, message: "User created", redirectUrl: "/login" });
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const result = [username, password];
        req.logger.error(`Error de tipo de dato: Error de inicio de sesión ${new Date().toLocaleString()}`);
        CustomError.createError({
          name: "Error de tipo de dato",
          cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
          message: "Error de inicio de sesión",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      } else {
        const result = await userService.getUser({ email });

        if (!validPassword(password, result.password)) {
          req.logger.error(`Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`);
          CustomError.createError({
            name: "Error de base de datos",
            cause: generateSessionErrorInfo(result, EErrors.NOT_FOUND_ERROR),
            message: "Usuario no encontrado",
            code: EErrors.NOT_FOUND_ERROR,
          });
        } else {
          const myToken = generateToken({
            firstName: result.firstName,
            email,
            password,
            role: result.role,
          });

          req.logger.info(`Inicio de sesión exitoso ${new Date().toLocaleString()}`);
          res.status(200).cookie("cookieTest", "coderCookie").json({
            success: true,
            message: "Inicio de sesión exitoso",
            redirectUrl: "/products",
          });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  recoverPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (email === "") return res.status(428).send({ status: "Error", message: "Email is required" });
      const user = await userService.getUser({ email });
      if (!user) return res.status(404).send({ status: "Error", message: "User not found" });

      if (user) {
        const urlToken = generateTokenUrl(user);
        await transport.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Recover Password",
          html: `<div>
                                <h1>
                                    Go to this link to change the password
                                </h1>
                                <a href="http://localhost:8080/login/change-of-password"> Change of password </a>
                          </div>`,
        });
        res.cookie("CoderCookieToken", urlToken, { maxAge: 60 * 60 * 100, httpOnly: true });
        return res.status(200).send({ status: "Success", message: "Email was sent to veryfy your identity" });
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  logout = async (req, res) => {
    try {
      console.log(1);
      req.session.destroy();
      console.log(2);
      // await userService.updateUser({ _id: req.user._id }, { lastConnection: Date() });

      return res.clearCookie("CoderCookieToken").redirect("/login");
    } catch (error) {
      console.log(error);
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
