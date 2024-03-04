import express from "express";
import { create } from "connect-mongo";
import { createMessage } from "../controllers/chat.controller.js";



const ChatRouter = express.Router();


ChatRouter.post("/", createMessage);



export default ChatRouter;
