import mongoose from "mongoose";
import crypto from "crypto";

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
   resetPasswordToken: String,  // Add this line for storing the reset token
  resetPasswordExpires: Date,  // Add this line for storing the token expiration time
});

// Method to generate a password reset token
userSchema.methods.generateResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');  // Generate a random hex token
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 3600000; // Token expires in one hour
  return resetToken;
};


const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
