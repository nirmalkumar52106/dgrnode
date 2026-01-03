const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  date: String, // YYYY-MM-DD
  month: String, // YYYY-MM
  status: { type: String, enum: ["present", "absent", "half"] }
});

const StaffAttendence = mongoose.model("StaffAttendence", attendanceSchema);
module.exports = StaffAttendence
