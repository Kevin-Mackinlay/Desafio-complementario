import express from "express";
import MessagesService from "../services/db/Chat.service.db.js";

const ChatRouter = express.Router();
const MessagesService = new MessagesService();

ChatRouter.post("/", async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await MessagesService.createMessage({ user, message });
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
