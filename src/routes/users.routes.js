import express from "express";
import services from "../services/factory.js";
import UsersController from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const usersRouter = express.Router();
const usersController = new UsersController(services.userService);

usersRouter.get("/", isAuthenticated(["admin"]), usersController.getUsers);
usersRouter.get("/:uid", isAuthenticated(["admin"]), usersController.getUserById);
usersRouter.post("/", isAuthenticated(["admin"]), usersController.createUser);
usersRouter.put("/:uid", isAuthenticated(["admin"]), usersController.modifyUser);
usersRouter.delete("/:uid", isAuthenticated(["admin"]), usersController.deleteUser);

export default usersRouter;
