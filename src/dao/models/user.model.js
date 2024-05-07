import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  cart: {
    type: String,
    ref: "carts",
  },
  birthDate: {
    type: Date,
  },
  role: {
    type: String,
    default: "user",
  },
  documents: [
    {
      name: String,
      reference: String,
      docType: String,
      _id: false,
    },
  ],

  lastConnection: {
    type: Date,
  },
});

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
