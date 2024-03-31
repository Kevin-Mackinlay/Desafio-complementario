import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  firstName: {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: String,
        ref: "carts"
    },
    birthDate:{
        type: Date,
    },
    role: {
        type: String,
        default: "user"
    },
  
    lastConnection: {
        type: Date
    }
  });

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
