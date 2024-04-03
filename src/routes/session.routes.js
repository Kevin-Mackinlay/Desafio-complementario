
import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";
import authorization from "../passportJwt/authorization.js";

const sessionRouter = Router();
const sessionsController = new sessionController();


sessionRouter.post("/login",  passport.authenticate("login", {}), sessionsController.login);
sessionRouter.post("/signup", passport.authenticate("signup", { session: false }), sessionsController.signup);
sessionRouter.get("/private", passport.authenticate("login", { session: false }), sessionsController.private);
sessionRouter.post("/logout", sessionsController.logout);
sessionRouter.get("/current", authorization(["user", "premium", "admin"]),sessionsController.infoCurrent);


export default sessionRouter;
