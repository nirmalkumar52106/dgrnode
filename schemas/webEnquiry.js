const mongoose = require("mongoose") 

const WebEngSchema = new mongoose.Schema({
    enqname : String,
    enqmobile : String,
    enqemail : String,
    enqCourse : String
  }); 
  const  WebEnq = mongoose.model('webenquiry', WebEngSchema);

  module.exports= WebEnq