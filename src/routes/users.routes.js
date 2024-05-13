import express from "express";
import UsersController from "../controllers/user.controller.js";
// import authorization from "../passportJwt/authorization.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:uid", usersController.getById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:uid", usersController.updateOldUser);
usersRouter.get("/:uid", usersController.deleteUser);
usersRouter.delete("/", usersController.deleteUsers);
usersRouter.post("/:uid/documents", upload.array("documents"), usersController.uploadDocuments);
usersRouter.put("/premium/:uid", usersController.changeOfRole);

export default usersRouter;
