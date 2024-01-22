import express from "express";
import ChatService from "../services/db/Chat.service.db.js";

const ChatRouter = express.Router();
const chatService = new ChatService();

ChatRouter.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await ChatService.createMessage({ user, message });
    if (!newMessage) {
      return res.status(400).json({ success: false, error: "Message could not be created" });
    }

    req.io.emit("newMessage", newMessage);

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default ChatRouter;
