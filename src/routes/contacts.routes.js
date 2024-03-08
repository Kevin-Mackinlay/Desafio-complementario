import { Router } from "express";
import Contacts from "../dao/mongo/contact.mongo.js";
import Contact from "../dao/memory/contact.memory.js";

const router = Router();
const contacts = new Contacts();

router.get("/", async (req, res) => {
  try {
    const data = await contacts.getAll();
    res.json(data);
  } catch (err) {
    console.error("Error getting contacts", err);
    res.status(500).json({ message: "Error getting contacts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const contact = req.body;
    const newContact = new Contacts(contact);
    const data = await contacts.create(newContact);
    res.json(data);
  } catch (err) {
    console.error("Error creating contact", err);
    res.status(500).json({ message: "Error creating contact" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contact = req.body;
    const data = await contacts.modify(id, contact);
    res.json(data);
  } catch (err) {
    console.error("Error updating contact", err);
    res.status(500).json({ message: "Error updating contact" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
    const id = req.params.id;
    const data = await contacts.delete(id);
    res.json(data);
  } catch (err) {
    console.error("Error deleting contact", err);
    res.status(500).json({ message: "Error deleting contact" });
  }
});

export default router;