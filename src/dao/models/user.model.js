import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{type: Number , required: true}
});

const User = mongoose.model(userCollection, UserSchema);

export default User;
