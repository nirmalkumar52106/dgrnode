const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

const StudentDgrLeads = mongoose.model("Student-dgr-lead", studentSchema);
module.exports = StudentDgrLeads
