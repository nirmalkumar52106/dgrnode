const mongoose = require("mongoose");

const AdminuserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,

  role: {
    type: String,
    enum: ["admin", "subadmin"],
    default: "subadmin"
  },

  permissions: {
    manageStudents: { type: Boolean, default: false },
    manageFees: { type: Boolean, default: false },
    manageCourses: { type: Boolean, default: false },
    enquiry: { type: Boolean, default: false },
    staff: { type: Boolean, default: false },
    test: { type: Boolean, default: false },
  }
}, { timestamps: true });

const AdminUsersss = mongoose.model('adminusers', AdminuserSchema);

  module.exports = AdminUsersss