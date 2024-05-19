import { logger } from "../utils/logger.js";
import { userService } from "../services/services.js";
import { generateToken, generateTokenUrl } from "../utils/jsonWebToken.js";
// import { validPassword, creaHash } from "../utils/bcryptHash.js";
import transport from "../utils/nodeMailer.js";
import bcrypt from "bcrypt";

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
    const { email } = req.body;
    try {
      const user = await userService.getUser({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Generate a reset token - this part is up to your implementation

      const resetToken = user.generateResetToken();
      await user.save(); // Save the user with the token

      // Send email with reset link
      const resetUrl = `http://localhost:8080/login/newPassword?token=${resetToken}&email=${email}`;
      const mailOptions = {
        from: "kemack83@gmail.com", // Your email address or another you choose
        to: email,
        subject: "Password Recovery",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transport.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: "Recovery email sent successfully, please check your inbox.",
      });

      // if (email === "") return res.status(428).send({ status: "Error", message: "Email is required" });
      // const user = await userService.getUser({ email });
      // if (!user) return res.status(404).send({ status: "Error", message: "User not found" });

      // if (user) {
      //   const urlToken = generateTokenUrl(user);
      //   await transport.sendMail({
      //     from: process.env.EMAIL_USER,
      //     to: user.email,
      //     subject: "Recover Password",
      //     html: `<div>
      //                           <h1>
      //                               Go to this link to change the password
      //                           </h1>
      //                           <a href="http://localhost:8080/login/change-of-password"> Change of password </a>
      //                     </div>`,
      //   });
      //   res.cookie("CoderCookieToken", urlToken, { maxAge: 60 * 60 * 100, httpOnly: true });
      //   return res.status(200).send({ status: "Success", message: "Email was sent to veryfy your identity" });
      // }
    } catch (error) {
      console.error("Password recovery error:", error);
      logger.error(error);
    }
  };

  newPassword = async (req, res) => {
    const { token, email, newPassword } = req.body; // Assume these are passed in the body

    try {
      // Find user by email and token, ensure token hasn't expired
      const user = await userService.getUserByResetToken(email, token);
      if (!user || user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user with new password and remove/reset the reset token fields
      const updateResult = await userService.updateUserPassword(user._id, hashedPassword);
      if (!updateResult) {
        throw new Error("Failed to update password");
      }

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({
        success: false,
        message: "Error updating password. Please try again.",
      });
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
