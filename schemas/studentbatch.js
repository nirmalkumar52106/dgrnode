const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
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
    ref: "student"
  }],


  course: {
    type: String,
    required: true,
    trim: true
  },

 
  currentSubject: {
    type: String,
    default: ""
  },


  currentTopic: {
    type: String,
    default: ""
  },

 
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