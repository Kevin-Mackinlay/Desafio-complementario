import express from "express";
import ChatControllers from "../controllers/chat.controller.js";


const ChatRouter = express.Router();
const chatController = new ChatControllers(services.chatService);

ChatRouter.post("/", chatController.createMessage);

export default ChatRouter;
