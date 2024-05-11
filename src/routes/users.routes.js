import express from "express";
import UsersController from "../controllers/user.controller.js";
// import authorization from "../passportJwt/authorization.js";
//import {uploader} from "../utils/multer.js";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:uid", usersController.getById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:uid", usersController.updateOldUser);
usersRouter.delete("/:uid",  usersController.deleteByUser);
// usersRouter.post("/:uid/documents",  uploader.any(), usersController.uploadDocuments);
usersRouter.put("/premium/:uid",  usersController.changeOfRole);


export default usersRouter;
