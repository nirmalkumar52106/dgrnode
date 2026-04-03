const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },

  timing: {
    start: { type: String },
    end: { type: String }
  },

  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff"
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],

  // ✅ Main Course
  course: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ Subject (HTML, CSS, JS)
  currentSubject: {
    type: String,
    default: ""
  },

  // ✅ Topic (Forms, Tables etc.)
  currentTopic: {
    type: String,
    default: ""
  },

  // ✅ Full tracking history 🔥
  topicHistory: [
    {
      subject: String,
      topic: String,
      date: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });



const Batch = mongoose.model("Batch" , batchSchema)
module.exports = Batch