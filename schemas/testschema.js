
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  startDateTime: Date,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String
    }
  ]
});


const Test = mongoose.model('studenttest', testSchema);

  module.exports = Test
