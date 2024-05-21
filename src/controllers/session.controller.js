import { logger } from "../utils/logger.js";
import { userService } from "../services/services.js";
import { generateToken, generateTokenUrl } from "../utils/jsonWebToken.js";
// import { validPassword, creaHash } from "../utils/bcryptHash.js";
import transport from "../utils/nodeMailer.js";
import { validPassword } from "../utils/bcryptHash.js";

export default class SessionsController {
  signup = async (req, res) => {
    try {
      console.log("Signup request received:", req.body); // Add this log
      if (!req.signupSuccess) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      res.status(201).json({ success: true, message: "User created", redirectUrl: "/login" });
    } catch (error) {
      console.log("Error during signup:", error); // Add this log
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
      await userService.updateUser(user._id, { resetPasswordToken: resetToken });

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
    } catch (error) {
      logger.error("Password recovery error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  newPassword = async (req, res) => {
    const { token, email, newPassword } = req.body;
    console.log("Request body:", req.body); // Log the entire request body
    console.log("Token:", token); // Log the token
    console.log("Email:", email); // Log the email
    console.log("New Password:", newPassword); // Log the new password

    try {
      const user = await userService.getUserByResetToken(email, token);
      console.log("User found:", user); // Log the user found by token

      //check if user is null
      if (!user || user.resetPasswordExpires < Date.now()) {
        console.log("User not found or invalid token");
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      // Log the resetPasswordExpires value
      const currentTime = new Date();
      console.log("Current time:", currentTime);
      console.log("User resetPasswordExpires:", user.resetPasswordExpires);

      // Check if token is expired
      if (user.resetPasswordExpires < currentTime) {
        console.log("Token expired");
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      //if everything is fine, update the password
      await userService.updateUserPassword(user._id, newPassword);
      console.log("Password updated successfully");

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
      req.session.destroy();
      return res.clearCookie("CoderCookieToken").redirect("/login");
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  infoCurrent = async (req, res) => {
    try {
      const { email } = req.user;
      const contact = await contactService.getContact({ email });

      if (contact) {
        res.status(200).send({ status: "success", toInfo: contact });
      } else {
        res.status(404).send({ status: "Error", message: "Your information does not exist" });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
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
