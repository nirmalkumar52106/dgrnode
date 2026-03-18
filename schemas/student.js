

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  name: String,
  email: String,
  mobile: String,
  address: String,
  parentMobile: String,


  course: {
    name: String, 
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing"
    }
  },

  grade: {
    type: String 
  },

  fees: {
    total: Number,
    paid: Number,
    dueDate: Date,
    emi: Boolean,
    paymentHistory: [
      {
        amount: Number,
        date: Date,
        mode: String
      }
    ]
  },

  attendance: [
    {
      date: Date,
      status: String
    }
  ]
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;