const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  grade: String,
  performance: String,
  baseSalary: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff
