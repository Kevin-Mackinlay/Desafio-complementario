import contactModel from "./models/contact.schema.js";

export default class Contacts {
  constructor() {}
  
    get = async () => {
      return await contactModel.find();
    };

    create = async () => {
        const newContact = new contactModel(contact)
        await newContact.save();
      return newContact;
    };

    modify = async (id, contact) => {
        return await contactModel.finByIdAndUpdate(id, contact, {new:true})

    };

    delete = async (id) => {
      return await contactModel.findByIdAndDelete(id);
    };
  }

