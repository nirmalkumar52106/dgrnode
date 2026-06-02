const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },

  fatherName: {
    type: String,
    required: true,
  },

  rollNo: {
    type: String,
    required: true,
    unique: true,
  },

  certificateId: {
    type: String,
    required: true,
    unique: true,
  },

  courseName: {
    type: String,
    required: true,
  },

  startDate: {
    type: String,
  },

  endDate: {
    type: String,
  },

  verifiedDate: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

const Certificatee = mongoose.model("Certificate", certificateSchema);

module.exports = Certificatee;