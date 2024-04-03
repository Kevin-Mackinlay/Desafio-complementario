import express from "express";
import services from "../dao/factory.js";
import UsersController from "../controllers/user.controller.js";
import authorization from "../passportJwt/authorization.js";

const usersRouter = express.Router();
const usersController = new UsersController(services.userService);

usersRouter.get("/", authorization(["admin"], usersController.getAllUsers));
usersRouter.get("/:uid", authorization(["admin"], usersController.getById));
usersRouter.post("/", authorization(["admin"], usersController.createUser));
usersRouter.put("/:uid", authorization(["admin"], usersController.updateOldUser));
usersRouter.delete("/:uid", authorization(["admin"], usersController.deleteByUser));

export default usersRouter;
