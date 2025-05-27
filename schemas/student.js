// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String, 
  email: String,
  mobile: String,
  address: String,
  parentMobile: String,
  fees: {
  total: Number,
  paid: Number,
  dueDate: Date,
  emi: Boolean,
  paymentHistory: [
    {
      amount: Number,
      date: Date,
      mode: String // Cash / UPI / Card etc.
    }
  ]
},
  attendance: [
    {
      date: Date,
      status: String, // "Present" or "Absent"
    }
  ]
});

const Student = mongoose.model('student', studentSchema);

  module.exports = Student
