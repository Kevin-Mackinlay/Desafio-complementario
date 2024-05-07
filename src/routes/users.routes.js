import express from "express";
import {UserServiceDb} from "../dao/factory.js";
import UsersController from "../controllers/user.controller.js";
import authorization from "../passportJwt/authorization.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", authorization(["admin"], usersController.getAllUsers));
usersRouter.get("/:uid", authorization(["admin"], usersController.getById));
usersRouter.post("/", authorization(["admin"], usersController.createUser));
usersRouter.put("/:uid", authorization(["admin"], usersController.updateOldUser));
usersRouter.delete("/:uid", authorization(["admin"], usersController.deleteByUser));
//userRouter.post("/:uid/documents", authorization(["user", "premium"]), uploader.any(), usersController.uploadDocuments);
//usersRouter.put("/premium/:uid", authorization(["user", "premium"]), usersController.changeOfRole);


export default usersRouter;
