import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  resetOTP: {
    type: String,
    default: null
  },

  otpExpire: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;