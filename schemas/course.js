
const mongoose = require("mongoose")

const courseschema = new mongoose.Schema({
    cardimage : String,
    coursecategory : String,
    courcedesc :  String,
    courcecreatedby : String,
    courceprice :  String,
    createdAt: { type: Date, default: Date.now },
  }); 
  const Course = mongoose.model('course', courseschema);

  module.exports = Course