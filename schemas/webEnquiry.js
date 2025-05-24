const mongoose = require("mongoose") 

const WebEngSchema = new mongoose.Schema({
    enqname : String,
    enqmobile : String,
    enqemail : String,
    enqCourse : String,
    enqDate: { type: Date, default: Date.now }
  }); 
  const  WebEnq = mongoose.model('webenquiry', WebEngSchema);

  module.exports= WebEnq