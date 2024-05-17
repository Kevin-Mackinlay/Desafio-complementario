import mongoose from 'mongoose';



const messageSchema = new mongoose.Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
}, { timestamps: true });

const messageModel = mongoose.model("Messages", messageSchema);

export default messageModel;
