
import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const sessionRouter = Router();
const sessionsController = new sessionController();

sessionRouter("/signup",  sessionsController.signup);
sessionRouter.post("/login",  passport.authenticate("login", {}), sessionsController.login);
sessionRouter.post("/signup", passport.authenticate("signup", { session: false }), sessionsController.signup);
sessionRouter.get("/private", passport.authenticate("privado", { session: false }), sessionsController.private);
sessionRouter.post("/logout", sessionsController.logout);
sessionRouter.get("/current", isAuthenticated(["user", "admin"]),  sessionsController.infoCurrent);


export default sessionRouter;
