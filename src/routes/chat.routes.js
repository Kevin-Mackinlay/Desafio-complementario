import express from "express";
import ChatControllers from "../controllers/chat.controller.js";


const ChatRouter = express.Router();
const chatController = new ChatControllers();

ChatRouter.post("/", chatController.createMessage);

export default ChatRouter;
