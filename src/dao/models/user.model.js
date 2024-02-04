import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    age: { type: Number, require: true },
    role:{type: String , require: true}
});

const User = mongoose.model(userCollection, UserSchema);

export default User;
