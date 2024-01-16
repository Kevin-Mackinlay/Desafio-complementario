import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    name :  { type: String, required: true, max: 100 },
    message : { type: String, required: true, max: 100 },
    date : { type: String, required: true, max: 100 },
});

export const messageModel = mongoose.model(messageCollection, messageSchema);
