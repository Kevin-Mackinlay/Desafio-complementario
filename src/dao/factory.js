import config from "../config/config.js";
import mongoose from "mongoose";
// import ContactsMongoDao from "./mongo/contact.mongo.js";
// import ContactsMemoryDao from "./memory/contact.memory.js";

export let Contacts;

switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: ContactMongo } = await import("./mongo/models/contact.mongo.js");
    Contacts = ContactMongo;
    break;
  case "MEMORY":
    const { default: ContactMemory } = await import("./memory/contact.memory.js");
    Contacts = ContactMemory;
    break;
  
}

export default Contacts;