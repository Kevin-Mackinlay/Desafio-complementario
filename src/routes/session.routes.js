import { Router } from "express";
import passport from "passport";
import UserModel from "../dao/models/user.model.js";
import { auth } from "../middlewares/index.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
  req.session.user = req.user;
  req.session.admin = true;
  res.redirect("/");
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserModel.findOne({ email, password });

    if (!bcrypt.compare(password, result.password)) {
      res.status(400).json({
        error: "Usuario o contraseña incorrectos",
      });
    } else {
      req.session.user = email;
      req.session.role = "admin";
      res.redirect("/products");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;

  

    const result = await UserModel.create({
      first_name,
      last_name,
      age,
      email,
      password: await bcrypt.hash(password, 10),
    });

    if (result === null) {
      res.status(400).json({
        error: "Error al crear el usuario",
      });
    } else {
      console.log(req.session);
      req.session.user = email;
      console.log(2);
      req.session.role = "admin";
      res.status(201).json({
        respuesta: "Usuario creado con éxito",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    title: "Privado",
    user: req.session.user,
  });
});

export default router;
