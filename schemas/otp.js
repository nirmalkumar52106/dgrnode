const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});

const StudentOtp = mongoose.model("StudentOtp", otpSchema);
module.exports = StudentOtp