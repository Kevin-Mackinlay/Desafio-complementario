import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
// import UserModel from "../dao/models/user.model.js";
import { auth } from "../middlewares/index.js";
import UserService from "../services/db/User.service.db.js";

const router = Router();
const userService = new UserService();

// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

// router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
//   req.session.user = req.user;
//   req.session.admin = true;
//   res.redirect("/");
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    const passwordsMatches = await bcrypt.compare(password, user.password);
    if (!passwordsMatches) {
      res.status(400).json({
        success: false,
        message: "password incorrect",
      });
    }
    delete user.password;
    req.session.user = user;
    res.status(200).json({
      success: true,
      message: "user logged in",
      redirectUrl: "/products",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

//     const result = await UserModel.findOne({ email, password });

//     if (!bcrypt.compare(password, result.password)) {
//       res.status(400).json({
//         error: "Usuario o contraseña incorrectos",
//       });
//     } else {
//       req.session.user = email;
//       req.session.role = "admin";
//       res.redirect("/products");
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      age,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "user created",
      redirectUrl: "/login",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//   const result = await UserModel.create({
//     first_name,
//     last_name,
//     age,
//     email,
//     password: await bcrypt.hash(password, 10),
//   });

//   if (result === null) {
//     res.status(400).json({
//       error: "Error al crear el usuario",
//     });
//   } else {
//     console.log(req.session);
//     req.session.user = email;
//     console.log(2);
//     req.session.role = "admin";
//     res.status(201).json({
//       respuesta: "Usuario creado con éxito",
//     });
//   }
// } catch (error) {
//   console.log(error.message);
//   res.status(500).json({
//     error: error.message,
//   });
// }

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    title: "Privado",
    user: req.session.user,
  });
});

export default router;
