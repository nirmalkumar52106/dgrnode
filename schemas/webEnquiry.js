const mongoose = require("mongoose") 

const WebEngSchema = new mongoose.Schema({
    enqname : String,
    enqmobile : String,
    enqemail : String,
    enqCourse : String,
    enqDate: { type: Date, default: Date.now },
  isRead: {
    type: Boolean,
    default: false,
  },
  }); 
  const  WebEnq = mongoose.model('webenquiry', WebEngSchema);

  module.exports= WebEnq