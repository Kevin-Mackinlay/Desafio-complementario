import express from "express";
import UsersController from "../controllers/user.controller.js";
import authorization from "../passportJwt/authorization.js";
//import {uploader} from "../utils/multer.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:uid", authorization(["admin"], usersController.getById));
usersRouter.post("/", authorization(["admin"], usersController.createUser));
usersRouter.put("/:uid", authorization(["admin"], usersController.updateOldUser));
usersRouter.delete("/:uid", authorization(["admin"], usersController.deleteByUser));
usersRouter.post("/:uid/documents", authorization(["user", "premium"]), uploader.any(), usersController.uploadDocuments);
usersRouter.put("/premium/:uid", authorization(["user", "premium"]), usersController.changeOfRole);


export default usersRouter;
