import { Router } from "express";
import passport from "passport";
import SessionController from "../controllers/session.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const sessionRouter = Router();
const sessionsController = new SessionController();

sessionRouter.post(
  "/login",
  isAuthenticated(["guest"]),
  (req, res, next) => {
    console.log("received login request:", req.body);
    passport.authenticate("login", (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({ success: false, message: info.message });
      }
      next();
    })(req, res, next);
  },
  sessionsController.login
);

sessionRouter.post(
  "/signup",
  (req, res, next) => {
    console.log("received signup request:", req.body);
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({ success: false, message: info });
      }
      next();
    })(req, res, next);
  },
  sessionsController.signup
);

sessionRouter.post("/recover-password", (req, res)=>{
  console.log("Route /recover-password accessed");
 sessionsController.recoverPassword(req, res);
}
);


sessionRouter.get("/google", (req, res, next) => {
  passport.authenticate("google", { scope: ["profile email"] }, (err, user, info) => {
    if (err || !user) {
      console.log(info);
      return res.status(401).json({ success: false, message: info.message });
    }

    next();
  })(req, res, next);
});

sessionRouter.get("/googlecallback", passport.authenticate("google"), (req, res) => {
  res.redirect("/products");
});

sessionRouter.get("/private", passport.authenticate("login", { session: false }), sessionsController.private);
sessionRouter.post(
  "/logout",
  (req, res, next) => {
    console.log("middle");
    next();
  },
  sessionsController.logout
);
sessionRouter.get(
  "/current",
  (req, res, next) => {
    console.log("received current request");
    next();
  },
  sessionsController.infoCurrent
);

export default sessionRouter;
