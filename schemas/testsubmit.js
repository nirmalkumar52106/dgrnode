
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'studenttest' },
  answers: [String], 
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const TestResult = mongoose.model('testresult', submissionSchema);

 module.exports = TestResult
