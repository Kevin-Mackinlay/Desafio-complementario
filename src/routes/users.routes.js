import express from "express";
import UserController from "../controllers/users.controller.js";
import services from "../services/factory.js";
import CustomError from "../Errors/customError.js";
import { generateUserErrorInfo } from "../Errors/info";

const usersRouter = express.Router();
const usersController = new UserController(services.userService);


router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:uid", usersController.modifyUser);
router.delete("/:uid", usersController.deleteUser);

export default usersRouter;
