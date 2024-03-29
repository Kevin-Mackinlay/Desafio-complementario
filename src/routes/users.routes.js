import express from "express";
import services from "../services/factory.js";
import UsersController from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import authorization from "../config/authorization.js";

const usersRouter = express.Router();
const usersController = new UsersController(services.userService);

usersRouter.get("/", authorization((["admin"]), usersController.getUsers));
usersRouter.get("/:uid", authorization((["admin"]), usersController.getUserById));
usersRouter.post("/", authorization((["admin"]), usersController.createUser));
usersRouter.put("/:uid", authorization((["admin"]), usersController.modifyUser));
usersRouter.delete("/:uid", authorization((["admin"]),  usersController.deleteUser));

export default usersRouter;
