// models/Batch.js
const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },

  timing: {
    start: String, // "09:00"
    end: String    // "10:00"
  },

  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff"
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "student"
  }]

}, { timestamps: true });

const Batch = mongoose.model("Batch" , batchSchema)

module.exports = Batch